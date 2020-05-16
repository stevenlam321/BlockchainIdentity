import User from './models/user';
import { port as serverPort,mongodbConnection } from './env';
import * as mongoose from 'mongoose';
import {InitFabricCtrls} from './convector';
import {Person,Organization,Attribute,Credential,Application} from 'did-cc';
import * as bcrypt from 'bcryptjs';
import {superAdminIdentityName} from './env';
import * as crypto from 'crypto';

const Fabric_Client = require('fabric-client');
const Fabric_CA_Client = require('fabric-ca-client');
const os = require('os');
const path = require('path');

const fabric_client = new Fabric_Client();
let fabric_ca_client = null;
let admin_user = null;
let member_user = null;
const homedir = os.homedir();
const hurleyIdentityPath = path.resolve(homedir, 'hyperledger-fabric-network/.hfc-org1');

console.log('Store path:' + hurleyIdentityPath);

mongoose.connect(mongodbConnection, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

User.collection.drop();

function initAdminClient(){
    return new Promise((resolve,reject)=>{
        //resolve('Successfully loaded admin from persistence');
        Fabric_Client.newDefaultKeyValueStore({
            path: hurleyIdentityPath
        }).then((state_store) => {
            // assign the store to the fabric client
             fabric_client.setStateStore(state_store);
             const crypto_suite = Fabric_Client.newCryptoSuite();
            // use the same location for the state store (where the users' certificate are kept)
            // and the crypto store (where the users' keys are kept)
             const crypto_store = Fabric_Client.newCryptoKeyStore({ path: hurleyIdentityPath });
             crypto_suite.setCryptoKeyStore(crypto_store);
             fabric_client.setCryptoSuite(crypto_suite);
    
            // be sure to change the http to https when the CA is running TLS enabled
            fabric_ca_client = new Fabric_CA_Client('http://localhost:7054', null, '', crypto_suite);
        
            // first check to see if the admin is already enrolled
            return fabric_client.getUserContext('admin', true);
        }).then((user_from_store) => {
            if (user_from_store && user_from_store.isEnrolled()) {
                admin_user = user_from_store;
              //  return fabric_client.setUserContext(member_user);
               resolve('Successfully loaded admin from persistence');
            } else {
                reject('Failed to get admin.... run enrollment');
              //  reject(new Error('Failed to get admin.... run enrollAdmin.js'));
            }
        }).catch((err)=>{
            console.log(err);
        });
    })
};
async function createUser(user){
    return new Promise(async (resolve,reject)=>{
        try{
            const secret = await fabric_ca_client.register({ enrollmentID: user.id, attrs: [{ name: 'role', value: user.role, ecert: true }], role: 'client' }, admin_user);
            //console.log(`Successfully registered ${user.id} - secret:' + ${secret}`);
            
            const enrollment = await fabric_ca_client.enroll({ enrollmentID: user.id, enrollmentSecret: secret });
           // console.log(`Successfully enrolled member user ${user.id} `);
            
            const obj = await fabric_client.createUser({
                username: user.id,
                mspid: 'org1MSP',
                cryptoContent: { privateKeyPEM: enrollment.key.toBytes(), signedCertPEM: enrollment.certificate }
            });
           
            const id = user.id;
            const ctrls = await InitFabricCtrls(id);
            const email = user.email;
            const mobile = user.mobile;;
            const role = user.role;
            const credentials = user.credentials?user.credentials:[];
            const personObj = new Person({id,email,mobile,role,credentials});
            await ctrls.person.create(personObj);
           // const person = new Person(await ctrls.person.show(id));
    
            const hashed_password = bcrypt.hashSync(user.password, 10);
            await User.create({email:email,password:hashed_password});
            console.log(`Person created  ID: ${user.id} Role: ${user.role}`);
            resolve('success');
        }catch(err){
            reject(err);
        }
    });    
}

async function setup(){
    try{
        const initAdminClientResult = await initAdminClient();
        console.log(initAdminClientResult);


        const superadmin = {
            id:"P-superadmin",
            email:"superadmin@hkdid.com",
            mobile:null,
            password:"12345678",
            role: "admin"
        };
       await createUser(superadmin);

        const users = [{
            id:"P-hktd_admin",
            email:"hktd_admin@hkdid.com",
            mobile:null,
            password:"12345678",
            role: "org"
            },
            {
                id:"P-hkimmd_admin",
                email:"hkimmd_admin@hkdid.com",
                mobile:null,
                password:"12345678",
                role: "org"
            },
            {
              id:"P-user1",
              email:"user1@hkdid.com",
              mobile:"12345678",
              password:"12345678",
              role: "user",
              credentials: [
                {
                  attributes: [
                    {
                      "attribute_id": "A-hkidno",
                      "name": "HK ID Card Number",
                      "type": "did.person.credential.attribute",
                      "value": "A123456(7)"
                    },
                    {
                      "attribute_id": "A-first_name",
                      "name": "First Name",
                      "type": "did.person.credential.attribute",
                      "value": "Steven"
                    },
                    {
                      "attribute_id": "A-last_name",
                      "name": "Last Name",
                      "type": "did.person.credential.attribute",
                      "value": "Lam"
                    },
                    {
                      "attribute_id": "A-gender",
                      "name": "Gender",
                      "type": "did.person.credential.attribute",
                      "value": "M"
                    },
                    {
                      "attribute_id": "A-dob",
                      "name": "Date of Birth",
                      "type": "did.person.credential.attribute",
                      "value": "1991-04-10"
                    },
                    {
                      "attribute_id": "A-issue_date",
                      "name": "Issue Date",
                      "type": "did.person.credential.attribute",
                      "value": "2005-01-01"
                    }
                  ],
                  "credential_id": "C-hkidcard",
                  "name": "Hong Kong Identity Card",
                  "organization_logo": "hkimmd.png",
                  "organization_name": "Hong Kong Immigration Department",
                  "type": "did.person.credential"
                }
              ]
          },
          {
            id:"P-developer",
            email:"developer@hkdid.com",
            mobile:"12345678",
            password:"12345678",
            role: "user"
        }
        ];
        for (const i in users) {
            await createUser(users[i]);
        }
            
    const organizations = [
        {
          id: "O-hktd",
          name: "Hong Kong Transport Department",
          logo: "hktd.png",
          person_id:"P-hktd_admin"
        },
        {
          id: "O-hkimmd",
          name: "Hong Kong Immigration Department",
          logo: "hkimmd.png",
          person_id:"P-hkimmd_admin"
        },
      ];

      for (const i in organizations) {
            const ctrls = await InitFabricCtrls(organizations[i].person_id);
            const organization = new Organization(organizations[i]);
            await ctrls.organization.create(organization);
            console.log(organizations[i].name + ' created');
        }


    const attributes = [
      {
        id: "A-hkidno",
        name: "HK ID Card Number",
      },
      {
        id: "A-first_name",
        name: "First Name",
      },
      {
        id: "A-last_name",
        name: "Last Name",
      },
      {
        id: "A-dob",
        name: "Date of Birth"
      },
      {
        id: "A-gender",
        name: "Gender"
      },
      {
        id: "A-issue_date",
        name: "Issue Date" 
      }
    ];

    const ctrls = await InitFabricCtrls(superAdminIdentityName);

    for (const i in attributes) {
      const attribute = new Attribute(attributes[i]);
      await ctrls.attribute.create(attribute);
      console.log("Attribute:" + attributes[i].id + ' created');
    }
    

    const credentials = [
        {
          id:"C-hkidcard",
          organization_id: "O-hkimmd",
          person_id:"P-hkimmd_admin",
          name: "Hong Kong Identity Card",
          attribute_ids: [
            "A-hkidno",
            "A-first_name",
            "A-last_name",
            "A-gender",
            "A-dob",
            "A-issue_date"
          ]
        }
    ];



      for (const i in credentials) {
        const ctrls = await InitFabricCtrls(credentials[i].person_id);
        const credential = {
          id:credentials[i].id,
          organization_id:credentials[i].organization_id,
          name:credentials[i].name,
          attribute_ids:credentials[i].attribute_ids,
        };
        let credentialObj = new Credential(credential);
        await ctrls.credential.create(credentialObj);
        console.log("Credential:" + credentials[i].id + ' created');
      }

      const apps =[{
        id: "APP-ABC123",
        name: "ABC Securities",
        secret: "123456789",
        person_id: "P-developer",
        post_back_url:"http://localhost:8083/",
        public_key: "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsksWZ4O2SXXtFWNosaB0PzGKelWzebWnLBQReVXXcw/25DAM4FmN4z91b5EqkujIs4uYmFCDWPKAdHdIK+D0RgDe8vZpTUmO8nysjc8sZ65KFkiw4IJPc7SNYLO8BeCqaHz/j3wxSvDQwi+bBf6jdofkPw8YWukZ2RCKA/dqKhorHSzkKf06Ztk4DFaUV7XaFB7bE2yTiacyPHr1rfVSgCpMfp1OgRV5xzlHJrCuK+QFTt4Udqh/lLpIWQBl0jwkZMITzlCmHllOEhfl7e0GY3poRgymx8RnQXeV6dqrw8O20cVJMcnY7DDI4/d/4qmSdWBbFjNyHkN3c4Q58qXbtwIDAQAB-----END PUBLIC KEY-----"
      }];


      for (const i in apps) {
        const ctrls = await InitFabricCtrls(apps[i].person_id);
        let applicationObj = new Application(apps[i]);
        await ctrls.application.create(applicationObj);
        console.log("Application:" + apps[i].id + ' created');
      }

      console.log('Finish initialization!');

    }catch(err){
        console.log(err);
    }
    

}

setup();



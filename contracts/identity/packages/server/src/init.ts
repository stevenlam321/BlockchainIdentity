import User from './models/user';
import { port as serverPort,mongodbConnection } from './env';
import * as mongoose from 'mongoose';
import {Init} from './convector';
import {Person,Organization} from 'did-cc';
import * as bcrypt from 'bcryptjs';

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
               resolve('Successfully loaded admin from persistence');
            } else {
                reject('Failed to get admin.... run enrollment');
              //  reject(new Error('Failed to get admin.... run enrollAdmin.js'));
            }
        })
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
            const ctrls = await Init(id);
            const email = user.email;
            const mobile = user.mobile;;
            const role = user.role;
            const personObj = new Person({id,email,mobile,role});
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
        await initAdminClient();

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
            const ctrls = await Init(organizations[i].person_id);
            const organization = new Organization(organizations[i]);
            await ctrls.organization.create(organization);
            console.log(organizations[i].name + ' created');
        }
    }catch(err){
        console.log(err);
    }
}

setup();


async function test(){
    for (var i = 0; i <20;i ++){
        const id = "P-"+ Math.random().toString(36).substr(2,10);
        const email = Math.random().toString(36).substr(2,10) + '@hkdid.com';
        const user = {
            id:id,
            email:email,
            mobile:null,
            password:"12345678",
            role: "admin"
        };
        await createUser(user);

    }
}




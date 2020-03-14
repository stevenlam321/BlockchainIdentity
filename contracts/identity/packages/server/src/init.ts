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

const user = {
    id:"superadmin6",
    email:"superadmin3@hkdid.com",
    mobile:null,
    password:"12345678",
    role: "admin"
};

async function createUser(user){
    if(!user.id){
        const id = "P-"+ Math.random().toString(36).substr(2,10);
        user.id = id;
    }
//create identity
// create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
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
        console.log('Successfully loaded admin from persistence');
        admin_user = user_from_store;
    } else {
        throw new Error('Failed to get admin.... run enrollAdmin.js');
    }

    // at this point we should have the admin user
    // first need to register the user with the CA server
    return fabric_ca_client.register({ enrollmentID: user.id, attrs: [{ name: 'role', value: user.role, ecert: true }], role: 'client' }, admin_user);
}).then((secret) => {
    // next we need to enroll the user with CA server
    console.log(`Successfully registered ${user.id} - secret:' + ${secret}`);

    return fabric_ca_client.enroll({ enrollmentID: user.id, enrollmentSecret: secret });
}).then((enrollment) => {
    console.log(`Successfully enrolled member user ${user.id} `);
    return fabric_client.createUser({
        username: user.id,
        mspid: 'org1MSP',
        cryptoContent: { privateKeyPEM: enrollment.key.toBytes(), signedCertPEM: enrollment.certificate }
    });
}).then((user) => {
    member_user = user;

    return fabric_client.setUserContext(member_user);
}).then(async() => {
    const id = user.id;
    const ctrls = await Init(id);
    const email = user.email;
    const mobile = user.mobile;;
    const role = user.role;
    const personObj = new Person({id,email,mobile,role});
    await ctrls.person.create(personObj);
    const person = new Person(await ctrls.person.show(id));

    const hashed_password = bcrypt.hashSync(user.password, 10);

   // console.log(person);
    
    try{
        user = await User.create({email:email,password:hashed_password});
    }catch(err){
       console.log(err);
    }
    console.log(`${user.id} was successfully registered and enrolled and is ready to interact with the fabric network`);

}).catch((err) => {
    console.error('Failed to register: ' + err);
    if (err.toString().indexOf('Authorization') > -1) {
        console.error('Authorization failures may be caused by having admin credentials from a previous CA instance.\n' +
            'Try again after deleting the contents of the store directory ' + hurleyIdentityPath);
    }
});
}


function createSuperAdmin(){
    const user = {
        id:"superadmin",
        email:"superadmin@hkdid.com",
        mobile:null,
        password:"12345678",
        role: "admin"
    };
    createUser(user);
}
createSuperAdmin();


async function createOrganizationAndUser(){
    var success = true;
    // //start init organizations
    const users = [{
        id:"hktdadmin",
        email:"hktdadmin@hkdid.com",
        mobile:null,
        password:"12345678",
        role: "org"
    },
    {
        id:"hkimmdadmin",
        email:"hkimmdadmin@hkdid.com",
        mobile:null,
        password:"12345678",
        role: "org"
    }];
    for (const i in users) {
        createUser(users[i]);
    }

    const organizations = [
      {
        id: "O-hktd",
        name: "Hong Kong Transport Department",
        logo: "hktd.png",
        person_id:"hktdadmin"
      },
      {
        id: "O-hkimmd",
        name: "Hong Kong Immigration Department",
        logo: "hkimmd.png",
        person_id:"hkimmdadmin"
      },
    ];

    try {
      for (const i in organizations) {
        const organization = new Organization(organizations[i]);
        await organization.save();
      }
    }
    catch (Error) {
      success = false;
    }

}
createOrganizationAndUser();




import * as dotenv from 'dotenv';
dotenv.config();

const homedir = require('os').homedir();

export const chaincode = process.env.CHAINCODE || 'did';
export const channel = process.env.CHANNEL || 'ch1';

// Automatically extract credentials by the user id
// If no .env config is found, fallback to Hurley defaults

export const adminIdentityName = process.env.IDENTITY || 'admin';
export const superAdminIdentityName = process.env.IDENTITY || 'P-superadmin';
export const identityOrg = process.env.ORG || 'org1';

export const basicCredentialName = 'C-hkidcard';
export const basicCredentialAttribute =  'A-hkidno';


export const keyStore = process.env.KEYSTORE || `/${homedir}/hyperledger-fabric-network/.hfc-${identityOrg}`;
export const networkProfile = process.env.NETWORKPROFILE || `/${homedir}/hyperledger-fabric-network/network-profiles/${identityOrg}.network-profile.yaml`;

export const port = process.env.PORT || 8080;

// Default to common values
export const couchDBView = process.env.COUCHDBVIEW || 'ch1_did';
export const couchDBProtocol = process.env.COUCHDB_PROTOCOL || 'http';
export const couchDBHost = process.env.COUCHDB_HOST || 'localhost';
export const couchDBPort = process.env.COUCHDB_PORT || 5084;

export const mongodbConnection = process.env.COUCHDB_PORT || 'mongodb://localhost/hkdid';
export const secretKey = process.env.SECRET_KEY || 'uyfhdjko239485t7ygvchxdjskwi';
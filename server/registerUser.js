/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');

// const ccpPath = path.resolve(__dirname, '..', '..', 'first-network', 'connection-org1.json');
const ccpPath = './local_fabric_connection.json';
const username = "mary";
async function main() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(username);
        if (userExists) {
            console.log('An identity for the user'+ username +'already exists in the wallet');
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (!adminExists) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({ affiliation: 'org1.department1', enrollmentID: username, role: 'client' }, adminIdentity);
        const enrollment = await ca.enroll({ enrollmentID: username, enrollmentSecret: secret });
        const userIdentity = X509WalletMixin.createIdentity('Org1MSP', enrollment.certificate, enrollment.key.toBytes());
        await wallet.import(username, userIdentity);


         // Get the network (channel) our contract is deployed to.
         const network = await gateway.getNetwork('mychannel');

         // Get the contract from the network.
         const contract = network.getContract('UserContract');
 
         // Evaluate the specified transaction.
         // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
         // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
         const data = JSON.stringify({"username:":username,"first_name":"Steven","last_name":"Lam"})
         const result = await contract.submitTransaction('createUser',username,data);
         console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        
        console.log('Successfully registered and enrolled admin user '+ username +' and imported it into the wallet');
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to register user ${username}: ${error}`);
        process.exit(1);
    }
}

main();

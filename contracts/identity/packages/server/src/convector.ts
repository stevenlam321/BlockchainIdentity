import { join, resolve } from "path";
import { keyStore, identityName, channel, chaincode, networkProfile, identityId } from './env';
import * as fs from 'fs';
import { FabricControllerAdapter } from '@worldsibu/convector-adapter-fabric';
import { ClientFactory } from '@worldsibu/convector-core';
import * as createError  from 'http-errors';
import { AttributeController, Attribute,Person,PersonController,OrganizationController,CredentialController } from 'did-cc';

async function InitFabricAdapter(identityID?: string) {
    if(!identityID){
        identityID = identityName;
    }else{
       //  identityID =identityID + "1";
    }
    const contextPath = join(keyStore + '/' + identityID);
    fs.readFile(contextPath, 'utf8', async function (err, data) {
        if (err) {
            //return next(createError(400,'fail'));
            throw new Error(`Context in ${contextPath} doesn't exist. Make sure that path resolves to your key stores folder`);
        }
    });
    //await SelfGenContext.getClient();
    const adapter = new FabricControllerAdapter({
      txTimeout: 300000,
      user: identityID,
      channel: channel,
      chaincode: chaincode,
      keyStore: resolve(__dirname, keyStore),
      networkProfile: resolve(__dirname, networkProfile),
      //userMspPath: keyStore
    });
  
    await adapter.init();
    return adapter;
  }
  /**
   * Building this adapter allows you to communicate with the
   * test env created by `hurley`.
   */
  
  export async function Init(identityID?: string) {
    const adapter = await InitFabricAdapter(identityID);
    return {
      adapter,
      attribute: ClientFactory(AttributeController, adapter),
      person: ClientFactory(PersonController, adapter),
      organization: ClientFactory(OrganizationController, adapter),
      credential: ClientFactory(CredentialController, adapter),
    };
  }


const adapter = new FabricControllerAdapter({
    txTimeout: 300000,
    user: identityName,
    channel,
    chaincode,
    keyStore: resolve(__dirname, keyStore),
    networkProfile: resolve(__dirname, networkProfile)
    // userMspPath: keyStore
});

export const initAdapter = adapter.init();
export const AttributeControllerBackEnd = ClientFactory(AttributeController, adapter);
export const PersonControllerBackEnd = ClientFactory(PersonController, adapter);
export const OrganizationControllerBackEnd = ClientFactory(OrganizationController, adapter);
export const CredentialControllerBackEnd = ClientFactory(CredentialController, adapter);

// const contextPath = join(keyStore + '/' + identityName);
// fs.readFile(contextPath, 'utf8', async function (err, data) {
//     if (err) {
//         throw new Error(`Context in ${contextPath} doesn't exist. Make sure that path resolves to your key stores folder`);
//     } else {
//         console.log('Context path with cryptographic materials exists');
//     }
// });

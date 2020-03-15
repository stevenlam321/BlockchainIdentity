import { join, resolve } from "path";
import { keyStore, superAdminIdentityName,rootAdminIdentityName ,channel, chaincode, networkProfile, } from './env';
import * as fs from 'fs';
import { FabricControllerAdapter } from '@worldsibu/convector-adapter-fabric';
import { ClientFactory } from '@worldsibu/convector-core';
import * as createError  from 'http-errors';
import { AttributeController, Attribute,Person,PersonController,OrganizationController,
  CredentialController,ApplicationController } from 'did-cc';

var defaultIdentityId = superAdminIdentityName;
var defaultidentityPath = join(keyStore + '/' + defaultIdentityId);
if(!fs.existsSync(defaultidentityPath)){
  defaultIdentityId = rootAdminIdentityName;
}
defaultidentityPath = join(keyStore + '/' + defaultIdentityId);

async function InitFabricAdapter(identityID?: string) {
    if(!identityID){
      identityID = defaultIdentityId;
     
      if(!fs.existsSync(defaultidentityPath)){
        throw new Error('Make sure superAdminIdentity or rootAdminIdentity  exists ');
      }
    }else{
      var identityPath = join(keyStore + '/' + identityID);
      if(!fs.existsSync(identityPath)){
        identityID = defaultIdentityId;
      }
    }

    //await SelfGenContext.getClient();
    try{
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
      console.log(identityID);
      return adapter;
    }catch(err){
      throw new Error('Make sure superAdminIdentity or rootAdminIdentity exists in keystore');
    }
   
  }
  /**
   * Building this adapter allows you to communicate with the
   * test env created by `hurley`.
   */
  export async function InitFabricCtrls(identityID?: string) {
    const adapter = await InitFabricAdapter(identityID);
    return {
      adapter,
      attribute: ClientFactory(AttributeController, adapter),
      person: ClientFactory(PersonController, adapter),
      organization: ClientFactory(OrganizationController, adapter),
      // credential: ClientFactory(CredentialController, adapter),
      // application: ClientFactory(ApplicationController, adapter),
    };
  }
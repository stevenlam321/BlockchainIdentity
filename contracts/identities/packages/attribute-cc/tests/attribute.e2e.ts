// tslint:disable:no-unused-expression
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import 'mocha';

import { CouchDBStorage } from '@worldsibu/convector-storage-couchdb';
import { FabricControllerAdapter } from '@worldsibu/convector-platform-fabric';
import { BaseStorage, ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';

import { Attribute, AttributeController } from '../src';

describe('Attribute', () => {
  let adapter: FabricControllerAdapter;
  let attributeCtrl: ConvectorControllerClient<AttributeController>;

  before(async () => {
      adapter = new FabricControllerAdapter({
        skipInit: true,
        txTimeout: 300000,
        user: 'user1',
        channel: 'ch1',
        chaincode: 'attribute',
        keyStore: '$HOME/hyperledger-fabric-network/.hfc-org1',
        networkProfile: '$HOME/hyperledger-fabric-network/network-profiles/org1.network-profile.yaml',
        userMspPath: '$HOME/hyperledger-fabric-network/artifacts/crypto-config/peerOrganizations/org1.hurley.lab/users/User1@org1.hurley.lab/msp',
        userMsp: 'org1MSP'
      });
      attributeCtrl = ClientFactory(AttributeController, adapter);
      await adapter.init(true);

      BaseStorage.current = new CouchDBStorage({
        host: 'localhost',
        protocol: 'http',
        port: '5084'
      }, 'ch1_attribute');
  });

  after(() => {
    // Close the event listeners
    adapter.close();
  });

  it('should create a default model', async () => {
    const modelSample = new Attribute({
      // id: uuid(),
      // name: 'Test',
      // created: Date.now(),
      // modified: Date.now()
    });

    await attributeCtrl.create(modelSample);

    const justSavedModel = await Attribute.getOne(modelSample.id);
    expect(justSavedModel.id).to.exist;
  });
});
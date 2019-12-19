// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Mychaincode, MychaincodeController } from '../src';

describe('Mychaincode', () => {
  let adapter: MockControllerAdapter;
  let mychaincodeCtrl: ConvectorControllerClient<MychaincodeController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    mychaincodeCtrl = ClientFactory(MychaincodeController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'MychaincodeController',
        name: join(__dirname, '..')
      }
    ]);

    adapter.addUser('Test');
  });
  
  it('should create a default model', async () => {
    const modelSample = new Mychaincode({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await mychaincodeCtrl.$withUser('Test').create(modelSample);
  
    const justSavedModel = await adapter.getById<Mychaincode>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});
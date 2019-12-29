// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Did, DidController } from '../src';

describe('Did', () => {
  let adapter: MockControllerAdapter;
  let didCtrl: ConvectorControllerClient<DidController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    didCtrl = ClientFactory(DidController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'DidController',
        name: join(__dirname, '..')
      }
    ]);

    adapter.addUser('Test');
  });
  
  it('should create a default model', async () => {
    const modelSample = new Did({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await didCtrl.$withUser('Test').create(modelSample);
  
    const justSavedModel = await adapter.getById<Did>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});
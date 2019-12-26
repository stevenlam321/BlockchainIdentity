// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Credential, CredentialController } from '../src';

describe('Credential', () => {
  let adapter: MockControllerAdapter;
  let credentialCtrl: ConvectorControllerClient<CredentialController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    credentialCtrl = ClientFactory(CredentialController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'CredentialController',
        name: join(__dirname, '..')
      }
    ]);

    adapter.addUser('Test');
  });
  
  it('should create a default model', async () => {
    const modelSample = new Credential({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await credentialCtrl.$withUser('Test').create(modelSample);
  
    const justSavedModel = await adapter.getById<Credential>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});
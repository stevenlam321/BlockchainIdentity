// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Person, PersonController } from '../src';

describe('Person', () => {
  let adapter: MockControllerAdapter;
  let personCtrl: ConvectorControllerClient<PersonController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    personCtrl = ClientFactory(PersonController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'PersonController',
        name: join(__dirname, '..')
      }
    ]);

    adapter.addUser('Test');
  });
  
  it('should create a default model', async () => {
    const modelSample = new Person({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await personCtrl.$withUser('Test').create(modelSample);
  
    const justSavedModel = await adapter.getById<Person>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});
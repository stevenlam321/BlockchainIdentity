// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Attribute, AttributeController,AttributeField } from '../src';

describe('Attribute', () => {
  let adapter: MockControllerAdapter;
  let attributeCtrl: ConvectorControllerClient<AttributeController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    attributeCtrl = ClientFactory(AttributeController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'AttributeController',
        name: join(__dirname, '..')
      }
    ]);

    adapter.addUser('Test');
  });
  
  // it('should create a default model', async () => {
  //   const modelSample = new Attribute({
  //       id: "email",
  //       name: "email",
  //       value: "stevenlam123@yahoo.com.hk",
  //   });

  //   await attributeCtrl.$withUser('Test').create(modelSample);
  
  //   const justSavedModel = await adapter.getById<Attribute>(modelSample.id);
  
  //   expect(justSavedModel.id).to.exist;
  // });

  it('should create a default model', async () => {
    const attribute_fields = new AttributeField(
      {
        id: "first_name",
        name: "First Name",
        field_type:"string",
        required: true
      }
  )
});

  // it('should create multiple attribute field', async () => {
  //   await attributeCtrl.$withUser('Test').init();
  //   // await attributeCtrl.$withUser('Test').create(modelSample);
  
  //   // const justSavedModel = await adapter.getById<Attribute>(modelSample.id);
  
  //   // expect(justSavedModel.id).to.exist;
  // });
});
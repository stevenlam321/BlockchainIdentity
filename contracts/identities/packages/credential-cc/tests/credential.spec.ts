// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Credential, CredentialController,CredentialTemplate } from '../src';
import { AttributeField } from 'attribute-cc';

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
  
  it('should create a credential model', async () => {
    const attribute_fields_data = [
      {
        id: 'first_name',
        name: 'First Name',
        field_type: 'string',
        required: true
      },
      {
        id: 'last_name',
        name: 'Last Name',
        field_type: 'string',
        required: true
      },
      {
        id: 'gender',
        name: 'Gender',
        field_type: 'string',
        required: true
      }
    ];
    var attribute_fields = [];
    for (const i in attribute_fields_data){
        const data = attribute_fields_data[i];
        attribute_fields.push (new AttributeField(data));
    }
   
    const template = new CredentialTemplate({
        id: "hkid_card",
        name: "HKID Card",
        attribute_fields: attribute_fields
    });
  
    // await credentialCtrl.$withUser('Test').create(modelSample);
  
    // const justSavedModel = await adapter.getById<Credential>(modelSample.id);
  
    // expect(justSavedModel.id).to.exist;
  });
});
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
    const result = await attributeCtrl.init();
   // console.log('init succcess? result' + result);
  });
  

  // it('just testing', async () => {
  //   //const attrs = await  Attribute.getAll();
  //  // console.log(attrs);
 
  //  Attribute.query({id:{ $lte: 5}}).then(function(data){
  //   console.log(data);
  //  });
  //   const s = await Attribute.query({ amount: { $lte: 5 } })
  // .then(function(obj){
  //   console.log(obj);
  //   console.log('found');
  // });
  // .catch(function (){
  //   console.log('not found');
  // });
 // console.log(s);
    // const result = await attributeCtrl.init();
    // expect(result).to.true;
 });

  // it('should run a success init', async () => {
  //    const result = await attributeCtrl.init();
  //    expect(result).to.true;
  // });
//   it('should create a default model', async () => {
//     const attribute_fields = new AttributeField(
//       {
//         id: "first_name",
//         name: "First Name",
//         field_type:"string",
//         required: true
//       }
//   )
// });

});
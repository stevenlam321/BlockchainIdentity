// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';
import * as chaiAsPromised from 'chai-as-promised';
import * as chai from 'chai';
import { Organization, OrganizationController } from '../src';
import * as fs from 'fs';
import * as path from 'path';

const assetPath = path.resolve('../../','assets');    

describe('Organization', () => {
  chai.use(chaiAsPromised);
  let adapter: MockControllerAdapter;
  let organizationCtrl: ConvectorControllerClient<OrganizationController>;
  const mockIdentity = 'B6:0B:37:7C:DF:D2:7A:08:0B:98:BF:52:A4:2C:DC:4E:CC:70:91:E1';


  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();

    await adapter.init([
      {
        version: '*',
        controller: 'OrganizationController',
        name: join(__dirname, '..')
      }
    ]);
    adapter.stub['fingerprint'] = mockIdentity;
   // adapter.addUser('Test');
   organizationCtrl = ClientFactory(OrganizationController, adapter);
  });
  
  it('should create the government identity', async () => {
   const imageAsBase64 = fs.readFileSync(assetPath+'/hksar.png', 'base64');
    await organizationCtrl.register('gov', 'Big Gov',imageAsBase64);

    const justSavedModel = await adapter.getById<Organization>('gov');

    expect(justSavedModel.id).to.exist;
  });
});
import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param,
  BaseStorage
} from '@worldsibu/convector-core';
import * as yup from 'yup';
import { Organization } from './organization.model';
import { ClientIdentity } from 'fabric-shim';

@Controller('organization')
export class OrganizationController extends ConvectorController<ChaincodeTx> {
  
  get fullIdentity(): ClientIdentity {
    const stub = (BaseStorage.current as any).stubHelper;
    return new ClientIdentity(stub.getStub());
  };

  @Invokable()
  public async create(
    @Param(Organization)
    organization: Organization
  ) {
    
    await organization.save();
  }

  @Invokable()
  public async register(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    name: string,
    @Param(yup.string())
    logo: string,
  ) {
    // Retrieve to see if exists
    const existing = await Organization.getOne(id);

    if (!existing || !existing.id) {
      let organization = new Organization();
      organization.id = id;
      organization.logo = logo;
      organization.name = name || id;
      organization.msp = this.fullIdentity.getMSPID();
      // Create a new identity
      organization.identities = [{
        fingerprint: this.sender,
        status: true
      }];
      await organization.save();
    } else {
      throw new Error('Identity exists already, please call changeIdentity fn for updates');
    }
  }
}
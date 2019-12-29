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
  public async init(
  ) {
    var success = true;
    const organizations = [
      {
        id: "hksar",
        name: "HKSAR",
        logo: "abcjidjii"
      },
      {
        id: "hkimmd",
        name: "Hong Kong Immigration Department",
        logo: "fuck"
      },
    ];
    try{
        for(const i in organizations){
          const organization = new Organization(organizations[i]);
          await organization.save();
        }
      }
      catch(Error){
        success = false;
      }
    return success;
  }

  @Invokable()
  public async index() {   
    return await Organization.getAll();
  }

  @Invokable()
  public async show( 
    @Param(yup.string())
    id: string
  ) {   
    const existing = await Organization.getOne(id);
    if (!existing || !existing.id) {
      throw new Error('Organization does not exist');
    }
    return existing;
  }

  @Invokable()
  public async create(
    @Param(Organization)
    organization: Organization
  ) {
    const existing = await Organization.getOne(organization.id);
    if (existing && existing.id) {
      throw new Error('Organization exists with that ID');
    }
    await organization.save();
  }

  @Invokable()
  public async update(
    @Param(Organization)
    organization: Organization
  ) {
    const existing = await Organization.getOne(organization.id);

    if (!existing || !existing.id) {
      throw new Error('Organization does not exist');
    }
    await organization.save();
  }

  @Invokable()
  public async destroy(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Organization.getOne(id);

    if (!existing || !existing.id) {
      throw new Error('Organization does not exist');
    }
    await existing.delete();
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
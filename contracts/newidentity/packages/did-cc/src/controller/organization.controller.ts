import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';
import * as yup from 'yup';
import {Person,Organization,Attribute,Credential } from '../model';

@Controller('organization')
export class OrganizationController extends ConvectorController<ChaincodeTx> {
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
    const existing = await Person.getOne(organization.id);
    if (!existing || !existing.id) {
      throw new Error('Organization does not exist');
    }
    await organization.save();
  }

  @Invokable()
  public async delete(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Organization.getOne(id);

    if (!existing || !existing.id) {
      throw new Error('Organization does not exist');
    }
    await existing.delete();
  }

}
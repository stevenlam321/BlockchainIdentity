import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';
import * as yup from 'yup';
import {Person,Organization,Attribute,Credential,Application } from '../model';

@Controller('application')
export class ApplicationController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async index() {   
    return await Application.getAll();
  }

  @Invokable()
  public async show( 
    @Param(yup.string())
    id: string
  ) {   
    const existing = await Application.getOne(id);
    if (!existing || !existing.id) {
      throw new Error('Application does not exist');
    }
    return existing;
  }

  @Invokable()
  public async create(
    @Param(Application)
    application: Application
  ) {
    const existing = await Attribute.getOne(application.id);
    if (existing && existing.id) {
      throw new Error('Application exists with that ID');
    }
    await application.save();
  }

  @Invokable()
  public async update(
    @Param(Application)
    application: Application
  ) {
    const existing = await Application.getOne(application.id);
    if (!existing || !existing.id) {
      throw new Error('Application does not exist');
    }
    await application.save();
  }

  @Invokable()
  public async delete(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Application.getOne(id);

    if (!existing || !existing.id) {
      throw new Error('Application does not exist');
    }
    await existing.delete();
  }

}
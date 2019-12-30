import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';
import * as yup from 'yup';
import {Person,Organization,Attribute,Credential } from '../model';

@Controller('attribute')
export class AttributeController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async index() {   
    return await Attribute.getAll();
  }

  @Invokable()
  public async show( 
    @Param(yup.string())
    id: string
  ) {   
    const existing = await Attribute.getOne(id);
    if (!existing || !existing.id) {
      throw new Error('Attribute does not exist');
    }
    return existing;
  }

  @Invokable()
  public async create(
    @Param(Attribute)
    attribute: Attribute
  ) {
    const existing = await Attribute.getOne(attribute.id);
    if (existing && existing.id) {
      throw new Error('Attribute exists with that ID');
    }
    await attribute.save();
  }

  @Invokable()
  public async update(
    @Param(Attribute)
    attribute: Attribute
  ) {
    const existing = await Attribute.getOne(attribute.id);
    if (!existing || !existing.id) {
      throw new Error('Attribute does not exist');
    }
    await attribute.save();
  }

  @Invokable()
  public async delete(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Attribute.getOne(id);

    if (!existing || !existing.id) {
      throw new Error('Attribute does not exist');
    }
    await existing.delete();
  }

}
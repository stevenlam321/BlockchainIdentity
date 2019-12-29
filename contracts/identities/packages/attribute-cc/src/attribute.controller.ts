import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';

import { Attribute,AttributeField } from './attribute.model';

@Controller('attribute')
export class AttributeController extends ConvectorController<ChaincodeTx> {

  @Invokable()
  public async init(
  ) {
    var success = true;
    const attributes = [
      {
        id: "first_name",
        name: "First Name",
        attribute_type: "string"
      },
      {
        id: "last_name",
        name: "Last Name",
        attribute_type: "string"
      },
      {
        id: "gender",
        name: "Gender",
        attribute_type: "string"
      },
      {
        id: "dob",
        name: "Date of Birth",
        attribute_type: "string"
      }
    ];
    try{
        for(const i in attributes){
          const attribute = new Attribute(attributes[i]);
          await attribute.save();
        }
      }
      catch(Error){
        success = false;
      }
    return success;
  }

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
  public async destroy(
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
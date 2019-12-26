import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
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
    const attributeFields = [
      {
        id: "first_name",
        name: "First Name",
      },
      {
        id: "last_name",
        name: "Last Name",
      },
      {
        id: "gender",
        name: "Gender",
      },
      {
        id: "dob",
        name: "Date of Birth",
      }
    ];
    for(const i in attributeFields){
      const data = attributeFields[i];
      const attributeField = new AttributeField(data);
      await attributeField.save();
    }
  }

  @Invokable()
  public async create(
    @Param(Attribute)
    attribute: Attribute
  ) {
    await attribute.save();
  }
}
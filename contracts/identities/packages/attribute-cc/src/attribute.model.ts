import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Attribute extends ConvectorModel<Attribute> {
  @ReadOnly()
  @Required()
  public readonly type = 'com.codefifa.did.attribute';

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.string())
  public value: string;

}

export class AttributeField extends ConvectorModel<AttributeField> {
  @ReadOnly()
  @Required()
  public readonly type = 'com.codefifa.did.attribute.field';

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.string())
  public field_type: string;//number,string,boolean,object

  @Required()
  @Validate(yup.boolean())
  public required: boolean;
}

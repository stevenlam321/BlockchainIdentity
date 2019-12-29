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
  public attribute_type: string;//number,string,boolean,object

  // @Required()
  // @Validate(yup.string())
  // public value: string;
}
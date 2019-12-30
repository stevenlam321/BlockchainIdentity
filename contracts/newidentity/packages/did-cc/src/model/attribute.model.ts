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
  public readonly type = 'did.attribute';

  @Required()
  @Validate(yup.string())
  public name: string;

  // @Required()
  // @Validate(yup.string())
  // public attribute_type: string;
}

export class PersonAttribute extends ConvectorModel<PersonAttribute> {
  @ReadOnly()
  @Required()
  public readonly type = 'did.person.attribute';

  @Required()
  @Validate(yup.string())
  public name: string;

  // @Required()
  // @Validate(yup.string())
  // public attribute_type: string;

  @Required()
  @Validate(yup.string())
  public value: string;
}
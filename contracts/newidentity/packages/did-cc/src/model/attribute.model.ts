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

}
export class CredentialAttribute extends ConvectorModel<CredentialAttribute> {
  @ReadOnly()
  @Required()
  public readonly type = 'did.credential.attribute';

  @Required()
  @Validate(yup.string())
  public attribute_id: string;

  @Required()
  @Validate(yup.string())
  public name: string;
  

  @Required()
  @Validate(yup.boolean())
  public required: boolean;
}
export class PersonCredentialAttribute extends ConvectorModel<PersonCredentialAttribute> {
  @ReadOnly()
  @Required()
  public readonly type = 'did.person.credential.attribute';

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.string())
  public value: string;
}

export class PersonCredentialAttributeValue extends ConvectorModel<PersonCredentialAttributeValue> {
  @ReadOnly()
  @Required()
  public readonly type = 'did.person.credential.attribute.value';

  @Required()
  @Validate(yup.string())
  public attribute_id: string;

  @Required()
  @Validate(yup.string())
  public value: string;
}
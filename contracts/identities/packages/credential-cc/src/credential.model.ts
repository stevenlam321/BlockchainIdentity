import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core-model';
import { Attribute,AttributeField } from 'attribute-cc';

export class Credential extends ConvectorModel<Credential> {
  @ReadOnly()
  @Required()
  public readonly type = 'com.codefifa.did.credential';

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.string())
  public organization_id: string;

  @Required()
  @Validate(yup.date())
  public issued_at: Date;

  @Validate(yup.array(Attribute.schema()))
  public attributes: Array<FlatConvectorModel<Attribute>>;
}

export class CredentialTemplate extends ConvectorModel<CredentialTemplate> {
  @ReadOnly()
  @Required()
  public readonly type = 'com.codefifa.did.credential.template';

  @Required()
  @Validate(yup.string())
  public name: string;


  @Validate(yup.array(AttributeField.schema()))
  public attribute_fields: Array<FlatConvectorModel<AttributeField>>;
}
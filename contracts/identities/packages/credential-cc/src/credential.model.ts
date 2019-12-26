import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core-model';
import { Attribute } from 'attribute-cc';

export class CredentialField extends ConvectorModel<Credential> {
  @ReadOnly()
  @Required()
  public readonly type = 'com.codefifa.did.credential.field';

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.string())
  public organization_id: string;
}


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
  public identities: Array<FlatConvectorModel<Attribute>>;
}
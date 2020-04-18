import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core-model';
import {Attribute,CredentialAttribute,PersonCredentialAttribute,PersonCredentialAttributeValue} from './attribute.model';
import {Organization} from './organization.model';

export class Credential extends ConvectorModel<Credential> {
  @ReadOnly()
  @Required()
  public readonly type = 'did.credential';

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.string())
  public organization_id: string;

  // @Required()
  @Validate(yup.string())
  public organization_name: string;

  // @Required()
  @Validate(yup.string())
  public organization_logo: string;

  @Validate(Organization.schema().nullable())
  public organization: FlatConvectorModel<Organization>;
  
  @Default([])
  @Required()
  @Validate(yup.array(Attribute.schema().nullable()))
  public attributes: Array<FlatConvectorModel<CredentialAttribute>>;

  @Validate(yup.array(yup.string()))
  public attribute_ids: Array<string>;
}

export class PersonCredential extends ConvectorModel<PersonCredential> {
  @ReadOnly()
  @Required()
  public readonly type = 'did.person.credential';

  @Required()
  @Validate(yup.string())
  public credential_id: string;

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.string())
  public organization_id: string;

  @Required()
  @Validate(yup.string())
  public organization_name: string;

  @Required()
  @Validate(yup.string())
  public organization_logo: string;

  @Validate(yup.array(PersonCredentialAttribute.schema()))
  public attributes: Array<FlatConvectorModel<PersonCredentialAttribute>>;
}

export class ApplicationCredential extends ConvectorModel<PersonCredential> {
  @ReadOnly()
  @Required()
  public readonly type = 'did.application.credential';

  @Required()
  @Validate(yup.string())
  public credential_id: string;

  @Validate(yup.array(yup.string()))
  public attribute_ids: Array<string>;
}
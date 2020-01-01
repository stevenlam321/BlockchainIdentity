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

  @Validate(yup.array(CredentialAttribute.schema()))
  public credential_attributes: Array<FlatConvectorModel<CredentialAttribute>>;
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

  @Validate(yup.array(PersonCredentialAttribute.schema()))
  public attributes: Array<FlatConvectorModel<PersonCredentialAttribute>>;
}

export class AssignCredential extends ConvectorModel<AssignCredential> {
  @ReadOnly()
  @Required()
  public readonly type = 'did.assign.credential';

  @Required()
  @Validate(yup.string())
  public person_id: string;

  @Required()
  @Validate(yup.string())
  public credential_id: string;

  @Validate(yup.array(PersonCredentialAttributeValue.schema()))
  public attributes: Array<FlatConvectorModel<PersonCredentialAttributeValue>>;
}
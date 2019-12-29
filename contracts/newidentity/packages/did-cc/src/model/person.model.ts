import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core-model';
import {Credential} from './credential.model';

// export class PersonCredentialAttribute extends ConvectorModel<PersonCredentialAttribute> {
//   @ReadOnly()
//   @Required()
//   public readonly type = 'com.codefifa.did.person.credential.attribute';

//   @Required()
//   @Validate(yup.string())
//   public name: string;

//   @Required()
//   @Validate(yup.string())
//   public attribute_type: string;//number,string,boolean,object

//   @Required()
//   @Validate(yup.string())
//   public value: string;

// }

// export class PersonCredential extends ConvectorModel<PersonCredential> {
//   @ReadOnly()
//   @Required()
//   public readonly type = 'com.codefifa.did.person.credential';

//   @Required()
//   @Validate(yup.string())
//   public name: string;

//   @Required()
//   @Validate(yup.string())
//   public organization_id: string;

//   @Validate(yup.array(PersonCredentialAttribute.schema()))
//   public person_credential_attributes: Array<FlatConvectorModel<PersonCredentialAttribute>>;
// }


export class Person extends ConvectorModel<Person> {
  @ReadOnly()
  @Required()
  public readonly type = 'did.person';

  @Required()
  @Validate(yup.string().email())
  public email: string;

  @Required()
  @Validate(yup.string())
  public country_code: string;

  @Required()
  @Validate(yup.string())
  public mobile: string;
  
  @ReadOnly()
  @Required()
  @Validate(yup.date())
  public readonly created_at: Date;
 
  @Validate(yup.array(Credential.schema()))
  public credentials: Array<FlatConvectorModel<Credential>>;

}
import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core-model';
import {Credential} from 'credential-cc';
export class Person extends ConvectorModel<Person> {
  @ReadOnly()
  @Required()
  public readonly type = 'com.codefifa.did.person';

  @Required()
  @Validate(yup.string().email())
  public email: string;

  // @Required()
  // @Validate(yup.string())
  // public country_code: string;

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

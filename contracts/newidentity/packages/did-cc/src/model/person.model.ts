import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core-model';
import {Credential,PersonCredential} from './credential.model';



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
  @Validate(yup.string().nullable())
  public mobile: string;
  
  @ReadOnly()
  @Required()
  @Default(new Date())
  @Validate(yup.date())
  public readonly created_at: Date;
 
  @Validate(yup.array(PersonCredential.schema()))
  public credentials: Array<FlatConvectorModel<PersonCredential>>;

}
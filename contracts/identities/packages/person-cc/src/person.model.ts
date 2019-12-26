import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

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
 
  // @Validate(yup.array(x509Identities.schema()))
  // public credentials: Array<FlatConvectorModel<x509Identities>>;

}

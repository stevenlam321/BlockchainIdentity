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

export class x509Identities extends ConvectorModel<x509Identities>{
  @ReadOnly()
  public readonly type = 'io.worldsibu.examples.x509identity';

  @Validate(yup.boolean())
  @Required()
  status: boolean;
  @Validate(yup.string())
  @Required()
  fingerprint: string;
}


export class Person extends ConvectorModel<Person> {
  @ReadOnly()
  @Required()
  public readonly type = 'did.person';

  @Required()
  @Validate(yup.string())
  @Default("P-"+Math.random().toString(36).substr(2, 10))
  public id: string;

  @Required()
  @Validate(yup.string().oneOf(["admin","org","user"]))
  public role: string;

  @Required()
  @Validate(yup.string().email())
  public email: string;

  @Required()
  @Validate(yup.string().nullable())
  public mobile: string;
  
  @ReadOnly()
  @Required()
  @Default(new Date())
  @Validate(yup.date())
  public readonly created_at: Date;
 
  @Default([])
  @Validate(yup.array(PersonCredential.schema()))
  public credentials: Array<FlatConvectorModel<PersonCredential>>;

  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;

}
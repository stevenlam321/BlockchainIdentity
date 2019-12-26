import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core-model';

export class x509Identities extends ConvectorModel<x509Identities>{
  @ReadOnly()
  public readonly type = 'com.codefifa.did.x509identity';

  @Validate(yup.boolean())
  @Required()
  status: boolean;
  @Validate(yup.string())
  @Required()
  fingerprint: string;
}

export class Organization extends ConvectorModel<Organization> {
  @ReadOnly()
  @Required()
  public readonly type = 'com.codefifa.did.organization';

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.string())
  public logo: string;

  @ReadOnly()
  @Validate(yup.string())
  public msp: string;

  @Validate(yup.array(x509Identities.schema()))
  public identities: Array<FlatConvectorModel<x509Identities>>;
}

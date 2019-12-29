import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core-model';
import {Attribute} from './attribute.model';

// export class CredentialAttribute extends ConvectorModel<CredentialAttribute> {
//   @ReadOnly()
//   @Required()
//   public readonly type = 'com.codefifa.did.credential.attribute';

//   @Required()
//   @Validate(yup.string())
//   public name: string;
  
//   @Required()
//   @Validate(yup.string())
//   public attribute_type: string;

//   @Required()
//   @Validate(yup.boolean())
//   public required: boolean;
// }

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

  @Validate(yup.array(Attribute.schema()))
  public attributes: Array<FlatConvectorModel<Attribute>>;
}
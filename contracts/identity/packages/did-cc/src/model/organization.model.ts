import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core-model';


export class Organization extends ConvectorModel<Organization> {
  @ReadOnly()
  @Required()
  public readonly type = 'did.organization';

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.string().nullable())
  public logo: string;

  @Required()
  @Validate(yup.string())
  public person_id: string;
}

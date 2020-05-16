import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core-model';


export class Application extends ConvectorModel<Application> {
  @ReadOnly()
  @Required()
  public readonly type = 'did.application';

  @Required()
  @Validate(yup.string())
  public person_id: string;

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.string())
  public secret: string;

  @Required()
  @Validate(yup.string())
  public public_key: string;

  @Required()
  @Validate(yup.string())
  public post_back_url: string;
}

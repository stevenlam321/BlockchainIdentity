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

  @ReadOnly()
  @Required()
  @Validate(yup.string())
  public name: string;

}

import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core-model';
import {ApplicationCredential} from './credential.model';

export class ApplicationRequest extends ConvectorModel<ApplicationRequest> {
  @ReadOnly()
  @Required()
  public readonly type = 'did.application.request';

  @Required()
  @Validate(yup.string())
  public app_id: string;

  @Required()
  @Validate(yup.string())
  public person_id: string;

  @Required()
  @Validate(yup.string())
  public data: string;
}

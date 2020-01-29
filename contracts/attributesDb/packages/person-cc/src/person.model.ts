import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate,
  FlatConvectorModel
} from '@worldsibu/convector-core-model';

export class Attribute extends ConvectorModel<Attribute>{
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.attribute';

  @Required()
  @Validate(yup.string())
  public name: string;
}
export class Person extends ConvectorModel<Person> {
  @ReadOnly()
  @Required()
  public readonly type = 'io.worldsibu.person';

  @Required()
  @Validate(yup.string())
  public name: string;

  //FlatConvectorModel only used to prevent save, delete method
  @Required()
  @Validate(yup.array(Attribute.schema().nullable()))
  public attributes: Array<FlatConvectorModel<Attribute>>;
 // public attributes: Array<Attribute>;

}

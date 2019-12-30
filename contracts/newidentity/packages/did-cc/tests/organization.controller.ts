import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';
import * as yup from 'yup';
import {Person,Organization,Attribute,Credential } from './model';

@Controller('organization')
export class OrganizationController extends ConvectorController<ChaincodeTx> {


  @Invokable()
  public async hello(
    @Param(yup.string())
    name: string
  ) {
    return name;
  }


}
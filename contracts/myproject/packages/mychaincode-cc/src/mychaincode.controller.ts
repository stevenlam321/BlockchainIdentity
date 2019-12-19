import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';

import { Mychaincode } from './mychaincode.model';

@Controller('mychaincode')
export class MychaincodeController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Mychaincode)
    mychaincode: Mychaincode
  ) {
    await mychaincode.save();
  }
}
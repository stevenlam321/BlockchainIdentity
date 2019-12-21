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
  @Invokable()
  public async test(
    username: string
  ) {   
    var s = "hello fuck" + username + "calculate = " + this.calculate();
    console.log(s);
    return s;
  }

  private calculate(){
    return 5+2;
  }
}
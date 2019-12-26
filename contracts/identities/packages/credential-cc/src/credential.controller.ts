import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';

import { Credential } from './credential.model';

@Controller('credential')
export class CredentialController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Credential)
    credential: Credential
  ) {
    await credential.save();
  }
}
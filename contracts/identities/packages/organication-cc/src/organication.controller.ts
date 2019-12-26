import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param,
  BaseStorage
} from '@worldsibu/convector-core';
import * as yup from 'yup';
import { Organication } from './organication.model';
import { ClientIdentity } from 'fabric-shim';

@Controller('organication')
export class OrganicationController extends ConvectorController<ChaincodeTx> {
  
  get fullIdentity(): ClientIdentity {
    const stub = (BaseStorage.current as any).stubHelper;
    return new ClientIdentity(stub.getStub());
  };

  @Invokable()
  public async create(
    @Param(Organication)
    organication: Organication
  ) {
    
    await organication.save();
  }

  @Invokable()
  public async register(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    name: string,
    @Param(yup.string())
    logo: string,
  ) {
    // Retrieve to see if exists
    const existing = await Organication.getOne(id);

    if (!existing || !existing.id) {
      let organication = new Organication();
      organication.id = id;
      organication.logo = logo;
      organication.name = name || id;
      organication.msp = this.fullIdentity.getMSPID();
      // Create a new identity
      organication.identities = [{
        fingerprint: this.sender,
        status: true
      }];
      await organication.save();
    } else {
      throw new Error('Identity exists already, please call changeIdentity fn for updates');
    }
  }
}
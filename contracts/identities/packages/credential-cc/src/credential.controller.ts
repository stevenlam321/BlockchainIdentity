import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';

import { Credential,CredentialAttribute } from './credential.model';

@Controller('credential')
export class CredentialController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async init(
  ) {
    var success = true;
    const credentials = [
      {
        id: "hkid_card",
        name: "HKID Card",
        organization_id: "gov",
        credential_attributes: [
          {
            id: "first_name",
            name: "First Name",
            attribute_type: "string",
            required: true
          },
          {
            id: "last_name",
            name: "Last Name",
            attribute_type: "string",
            required: true
          },
          {
            id: "dob",
            name: "Date of Birth",
            attribute_type: "string",
            required: true
          },
          {
            id: "gender",
            name: "Gender",
            attribute_type: "string",
            required: true
          }
        ]
      }
    ];
    try{
        for(const i in credentials){
          const credential = new Credential(credentials[i]);
          await credential.save();
        }
      }
      catch(Error){
        success = false;
      }
    return success;
  }

  @Invokable()
  public async create(
    @Param(Credential)
    credential: Credential
  ) {
    await credential.save();
  }
}
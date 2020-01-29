import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';
import * as yup from 'yup';

import {Person,Organization,Attribute,Credential } from '../model';

@Controller('did')
export class DidController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async init() {
    var success = true;
    // //start init organizations
    const organizations = [
      {
        id: "O-hktd",
        name: "Hong Kong Transport Department",
        logo: "hktd.png"
      },
      {
        id: "O-hkimmd",
        name: "Hong Kong Immigration Department",
        logo: "hkimmd.png"
      },
    ];

    try{
        for(const i in organizations){
          const organization = new Organization(organizations[i]);
          await organization.save();
        }
      }
      catch(Error){
        success = false;
      }
      //end init organizations

    
    //start init attributes
    const attributes = [
      {
        id: "A-hkidno",
        name: "HK ID Card Number",
      },
      {
        id: "A-first_name",
        name: "First Name",
      },
      {
        id: "A-last_name",
        name: "Last Name",
      },
      {
        id: "A-dob",
        name: "Date of Birth"
      },
      {
        id: "A-gender",
        name: "Gender"
      }
    ];

    try{
        for(const i in attributes){
          const attribute = new Attribute(attributes[i]);
          await attribute.save();
        }
      }
      catch(Error){
        success = false;
      }
      //end init attributes


          //start init credentials
    const credentials = [
      {
        id: "C-hkidcard",
        name: "Hong Kong Identity Card",
        organization_id: "O-hkimmd",
        attributes:[
          {
            id: "A-hkidno",
            name: "HK ID Card Number"
          },
          {
            id: "A-first_name",
            name: "First Name"
          },
          {
            id: "A-last_name",
            name: "Last Name"
          },
          {
            id: "A-dob",
            name: "Date of Birth"
          },
          {
            id: "A-gender",
            name: "Gender"
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
      //end init attributes


      //start init person
      const persons = [
        {
          email: "stevenlam123@yahoo.com.hk",
          mobile: null,
          created_at: new Date("2019-10-10 12:00:01"),
         credentials: [
            {
              id: "C-hkidcard",
              name: "Hong Kong Identity Card",
              organization_id: "O-hkimmd",
              attributes: [
                {
                  id: "A-hkidno",
                  name: "HK ID Card Number",
                  value: "A123456(7)"
                },
                {
                  id: "A-first_name",
                  name: "First Name",
                  value: "Steven"
                },
                {
                  id: "A-last_name",
                  name: "Last Name",
                  value: "Lam"
                },
                {
                  id: "A-dob",
                  name: "Date of Birth",
                  value: "2000-01-01"
                },
                {
                  id: "A-gender",
                  name: "Gender",
                  value: "M"
                }
              ]
            }
          ]
      }
      ];
      try{
          for(const i in persons){
            const person = new Person(persons[i]);
            await person.save();
          }
        }
        catch(Error){
          success = false;
        }
        return success;

  }
}

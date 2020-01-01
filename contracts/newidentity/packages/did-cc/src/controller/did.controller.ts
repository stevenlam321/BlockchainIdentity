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
    //start init organizations
    const organizations = [
      {
        id: "O-hksar",
        name: "HKSAR",
        logo: "abcjidjii"
      },
      {
        id: "O-hkimmd",
        name: "Hong Kong Immigration Department",
        logo: "fuck"
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
        credential_attributes:[
          {
            attribute_id: "A-hkidno",
            name: "HK ID Card Number",
            required: true
          },
          {
            attribute_id: "A-first_name",
            name: "First Name",
            required: true
          },
          {
            attribute_id: "A-last_name",
            name: "Last Name",
            required: true
          },
          {
            attribute_id: "A-dob",
            name: "Date of Birth",
            required: true
          },
          {
            attribute_id: "A-gender",
            name: "Gender",
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
      //end init attributes


  //     //start init person
  //     const persons = [
  //       {
  //         id: "abcd",
  //         email: "stevenlam123@yahoo.com.hk",
  //         country_code: "852",
  //         mobile: "63742615",
  //         created_at: new Date("2019-10-10 12:00:01"),
  //         credentials: [
  //           {
  //             id: "hkid_card",
  //             name: "HKID Card",
  //             organization_id: "gov",
  //             attributes: [
  //               {
  //                 id: "hkidno",
  //                 name: "HKID Card Number",
  //                 attribute_type: "string",
  //                 value: "A123456(7)"
  //               },
  //               {
  //                 id: "first_name",
  //                 name: "First Name",
  //                 attribute_type: "string",
  //                 value: "Steven"
  //               },
  //               {
  //                 id: "last_name",
  //                 name: "Last Name",
  //                 attribute_type: "string",
  //                 value: "Lam"
  //               },
  //               {
  //                 id: "dob",
  //                 name: "Date of Birth",
  //                 attribute_type: "string",
  //                 value: "2000-01-01"
  //               },
  //               {
  //                 id: "gender",
  //                 name: "Gender",
  //                 attribute_type: "string",
  //                 value: "M"
  //               }
  //             ]
  //           }
  //         ]
  //     }
  //     ];
  //    // return JSON.stringify(persons);
  //     try{
  //         for(const i in persons){
  //           const person = new Person(persons[i]);
  //           await person.save();
  //         }
  //       }
  //       catch(Error){
  //         success = false;
  //       }
  //       return success;

  }
}

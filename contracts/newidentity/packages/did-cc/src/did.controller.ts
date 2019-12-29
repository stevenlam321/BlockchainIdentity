import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';

import {Person,Organization,Attribute,Credential } from './model';

@Controller('did')
export class DidController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async init(

  ) {
    var success = true;

    //start init organizations
    const organizations = [
      {
        id: "hksar",
        name: "HKSAR",
        logo: "abcjidjii"
      },
      {
        id: "hkimmd",
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


      //start init person
      const persons = [
        {
          id: "abcd",
          email: "stevenlam123@yahoo.com.hk",
          country_code: "852",
          mobile: "63742615",
          created_at: new Date("2019-10-10 12:00:01"),
          credentials: [
            {
              id: "hkid_card",
              name: "HKID Card",
              organization_id: "gov",
              attributes: [
                {
                  id: "hkidno",
                  name: "HKID Card Number",
                  attribute_type: "string",
                  value: "A123456(7)"
                },
                {
                  id: "first_name",
                  name: "First Name",
                  attribute_type: "string",
                  value: "Steven"
                },
                {
                  id: "last_name",
                  name: "Last Name",
                  attribute_type: "string",
                  value: "Lam"
                },
                {
                  id: "dob",
                  name: "Date of Birth",
                  attribute_type: "string",
                  value: "2000-01-01"
                },
                {
                  id: "gender",
                  name: "Gender",
                  attribute_type: "string",
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

  // @Invokable()
  // public async create(
  //   @Param(Did)
  //   did: Did
  // ) {
  //   await did.save();
  // }


}
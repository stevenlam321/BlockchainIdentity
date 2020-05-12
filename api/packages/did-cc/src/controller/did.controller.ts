import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';
import * as yup from 'yup';

import { Person, Organization, Attribute, Credential,ApplicationRequest } from '../model';

@Controller('did')
export class DidController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async init() {
    // var success = true;
    // // //start init organizations
    // const organizations = [
    //   {
    //     id: "O-hktd",
    //     name: "Hong Kong Transport Department",
    //     logo: "hktd.png"
    //   },
    //   {
    //     id: "O-hkimmd",
    //     name: "Hong Kong Immigration Department",
    //     logo: "hkimmd.png"
    //   },
    // ];

    // try {
    //   for (const i in organizations) {
    //     const organization = new Organization(organizations[i]);
    //     await organization.save();
    //   }
    // }
    // catch (Error) {
    //   success = false;
    // }
    // //end init organizations


    // //start init attributes
    // const attributes = [
    //   {
    //     id: "A-hkidno",
    //     name: "HK ID Card Number",
    //   },
    //   {
    //     id: "A-first_name",
    //     name: "First Name",
    //   },
    //   {
    //     id: "A-last_name",
    //     name: "Last Name",
    //   },
    //   {
    //     id: "A-dob",
    //     name: "Date of Birth"
    //   },
    //   {
    //     id: "A-gender",
    //     name: "Gender"
    //   }
    // ];

    // try {
    //   for (const i in attributes) {
    //     const attribute = new Attribute(attributes[i]);
    //     await attribute.save();
    //   }
    // }
    // catch (Error) {
    //   success = false;
    // }
    // //end init attributes


    // //start init credentials
    // const credentials = [
    //   {
    //     id: "C-hkidcard",
    //     name: "Hong Kong Identity Card",
    //     organization_id: "O-hkimmd",
    //     attributes: [
    //       {
    //         attribute_id: "A-hkidno",
    //         name: "HK ID Card Number"
    //       },
    //       {
    //         attribute_id: "A-first_name",
    //         name: "First Name"
    //       },
    //       {
    //         attribute_id: "A-last_name",
    //         name: "Last Name"
    //       },
    //       {
    //         attribute_id: "A-dob",
    //         name: "Date of Birth"
    //       },
    //       {
    //         attribute_id: "A-gender",
    //         name: "Gender"
    //       }
    //     ]
    //   }
    // ];


    // try {
    //   for (const i in credentials) {
    //     const credential = new Credential(credentials[i]);
    //     await credential.save();
    //   }
    // }
    // catch (Error) {
    //   success = false;
    // }
    // //end init attributes


    // //start init person
    // const persons = [
    //   {
    //     email: "stevenlam123@yahoo.com.hk",
    //     mobile: null,
    //     created_at: new Date("2019-10-10 12:00:01"),
    //     credentials: [
    //       {
    //         credential_id: "C-hkidcard",
    //         name: "Hong Kong Identity Card",
    //         organization_id: "O-hkimmd",
    //         attributes: [
    //           {
    //             attribute_id: "A-hkidno",
    //             name: "HK ID Card Number",
    //             value: "A123456(7)"
    //           },
    //           {
    //             attribute_id: "A-first_name",
    //             name: "First Name",
    //             value: "Steven"
    //           },
    //           {
    //             attribute_id: "A-last_name",
    //             name: "Last Name",
    //             value: "Lam"
    //           },
    //           {
    //             attribute_id: "A-dob",
    //             name: "Date of Birth",
    //             value: "2000-01-01"
    //           },
    //           {
    //             attribute_id: "A-gender",
    //             name: "Gender",
    //             value: "M"
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // ];
    // try {
    //   for (const i in persons) {
    //     const person = new Person(persons[i]);
    //     await person.save();
    //   }
    // }
    // catch (Error) {
    //   success = false;
    // }
    // // const d = { "id":"sds","app_id": "APP-1", "person_id": "APP-6fdzg01baw", "credentials": [{ "credential_id": "C-hkidcard", "attribute_ids": ["A-hkidno", "A-first_name"] }]};
    // // const applicationRequest = new ApplicationRequest(d);
    // // await applicationRequest.save();

    // return success;


  }
}

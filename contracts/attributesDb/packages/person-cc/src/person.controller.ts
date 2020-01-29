import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';

import { Person, Attribute } from './person.model';

@Controller('person')
export class PersonController extends ConvectorController<ChaincodeTx> {

    //check modle defintion
    @Invokable()
    public async test(
     
    ) {
       const person = {
         "id":"P01",
         "name":"Steven",
         "org_id" : "ohfd",
         "attributes":[
           {
             "id":"hey",
             "name":"First Name"
           }
         ]
       };
       
       const p = new Person(person);
       p.save();
    }


  //check modle defintion
  @Invokable()
  public async create(
    @Param(Person)
    person: Person
  ) {
    await person.save();
  }


  // Invalid function invocation arguments\n    \n    Function param1 invoked with 0 params but 3 expected
  @Invokable()
  public async param1(
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    name: string,
    @Param(yup.string())
    value: string
  ) {
    console.log(id+ ":"+ name +":" + value);
    // await person.save();
  }
    // Invalid function invocation arguments\n    \n    Function param1 invoked with 0 params but 3 expected
    @Invokable()
    public async param2(
      @Param(yup.string())
      id: string
    ) {
       const person = await Person.getOne(id);
       
       // can not assign because mising parameters
        // const attributes = [{
        //     "name":"First Name"
        // }];
        // person.attributes = attributes;
      

        // save a attribute with only type
        // "attributes": [
        //   {
        //     "type": "io.worldsibu.attribute"
        //   }
        // ]
        // const attributes = [
        //   new Attribute()
        // ];
        // person.attributes = attributes;


        // const attributes = [
        //   //new ModelName only accept an id or empty param or object
        //   new Attribute()
        // ];
        // person.attributes = attributes;


       // const attribute = new Attribute({id:"A000001",name:"First Name"});
     // attribute.save clone delete;

        
        const attributes = [
          new Attribute({id:"A000002",name:"First Name"})
        ];
        person.attributes = attributes;
        await person.save();
      
      // const attribute = person.attributes[0];
      //   console.log(attribute);
      //   attribute.name = "Last Name";
      //   attribute.save();
      //   //{"name":"Error","status":500,"message":"attribute.save is not a function"
      //   console.log(attribute);

      //save a new attribute row 
      // const attribute = new Attribute(person.attributes[0]);
      // console.log(attribute);
      // attribute.name = "Last Name";
      // attribute.save();
      // //{"name":"Error","status":500,"message":"attribute.save is not a function"
      // console.log(attribute);


      //update the specific attribute name save by person.save()
      //  const attribute = person.attributes[0];
      // attribute.name = "Last Name";
      // await person.save();
     
      // const attribute = person.attributes[0];
      // attribute.name = "Age";
      // await person.save();



      //add new nested rows
      //person.attributes.push(new Attribute({id:"A999",name:"Date of Birth"}));

      //remove nested rows
      // const attribute = person.attributes[0];
      // person.attributes = person.attributes.filter(attribute =>{
      //   return attribute.id != 'A000001';
      // });
 
      // await person.save();
      //console.log(person);
    }

    @Invokable()
    public async param3(
      @Param(yup.string())
      id: string
    ) {
        // const org = new Organization({id:'gov',name:"Hong Kong Government"});
        // org.save();
       const person = await Person.getOne(id);
      //  const org =  await Organization.getOne(person.org_id);
      // //  person.organization = org;
      //  console.log(person);
      //  return "{username:'steven'}";
      //  person.org_id = 'gov';
      //  await person.save();
    }
}
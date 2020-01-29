import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param,
  FlatConvectorModel
} from '@worldsibu/convector-core';
import * as yup from 'yup';
import { Person, Organization, Attribute, Credential, PersonCredentialAttributeValue,PersonCredential, AssignCredential } from '../model';

@Controller('organization')
export class OrganizationController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async index() {
    return await Organization.getAll();
  }

  @Invokable()
  public async show(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Organization.getOne(id);
    if (!existing || !existing.id) {
      throw new Error('Organization does not exist');
    }
    return existing;
  }

  @Invokable()
  public async create(
    @Param(Organization)
    organization: Organization
  ) {
    const existing = await Organization.getOne(organization.id);
    if (existing && existing.id) {
      throw new Error('Organization exists with that ID');
    }
    await organization.save();
  }

  @Invokable()
  public async update(
    @Param(Organization)
    organization: Organization
  ) {
    const existing = await Person.getOne(organization.id);
    if (!existing || !existing.id) {
      throw new Error('Organization does not exist');
    }
    await organization.save();
  }

  @Invokable()
  public async delete(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Organization.getOne(id);

    if (!existing || !existing.id) {
      throw new Error('Organization does not exist');
    }
    await existing.delete();
  }

  @Invokable()
  public async assisn_credential(
    @Param(AssignCredential)
    assign_credential: AssignCredential
    // @Param(yup.string())
    // person_id: string,
    // @Param(yup.string())
    // credential_id: string,
    // @Param(yup.array())
    // attributes: any
  ) {
    const person_id = assign_credential.person_id;
    const credential_id = assign_credential.credential_id;
    const attributes = assign_credential.attributes;

    //  console.log(assign_credential);
    const person = await Person.getOne(person_id);
    if (!person || !person.id) {
      throw new Error('Person does not exist');
    }

    const credential = await Credential.getOne(credential_id);
    if (!credential || !credential.id) {
      throw new Error('Credential does not exist');
    }

    if(this.credential_exist(person.credentials,credential_id)){
      throw new Error('Credential already exist in this person');
    }

   // const credential_attributes = credential.credential_attributes;
    const result = this.validate_credential_attributes(credential,attributes);
    // console.log(result);
    if(!result.success){
        throw new Error(result.errors.join(','));
    }
    
    person.credentials.push(result.credential);
    // if(!person.credentials){

    // }
  //  const credentials = person.credentials;
    
    

    // const credentials = person.credentials = [];
   // console.log(result.credential);
    // console.log("========================================>>>>>>>>>>>>");
    //  console.log(person);
    //  console.log("========================================>>>>>>>>>>>>");
    // console.log(credential);



    // credential_attributes = result.credential_attributes;
    // console.log(person);
    // console.log(result);
    // console.log(credential);
    // console.log(attributes);
   // person.credentials = result.credential_attributes;
   // await person.save();

     await person.save();
  }

  private credential_exist(credentials:Array<FlatConvectorModel<PersonCredential>>,credential_id:string):boolean {
    // for (let credential of credentials) {
    //   if(credential.credential_id == credential_id){
    //       return true;
    //   }
    // }
     return false;
  }

  private validate_credential_attributes(credential, attributes) {
    const errors: string [] = [];
    const credential_attributes = credential.credential_attributes;
    for (let credential_attribute of credential_attributes) {
      var attr_exist = false;
      for (let attribute of attributes) {
        if (attribute.attribute_id == credential_attribute.attribute_id) {
          credential_attribute.value = attribute.value;
          attr_exist = true;
          continue;
        }
      }
      if (!attr_exist) {
        errors.push('attribute:' + credential_attribute.attribute_id + " does not exists");
      }
    }

    if (errors.length > 0) {
      return { success: false, errors };
    } else {
      return { success: true, credential };
    }
  }
}
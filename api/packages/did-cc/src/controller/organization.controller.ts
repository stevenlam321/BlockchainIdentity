import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param,
  FlatConvectorModel
} from '@worldsibu/convector-core';
import * as yup from 'yup';
import { Person, Organization, Attribute, Credential,PersonCredentialAttribute, PersonCredentialAttributeValue,PersonCredential } from '../model';

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
    const person = await Person.getOne(organization.person_id);
    if (!person || !person.id) {
      throw new Error('Person does not exist');
    }

    if(person.role != 'org'){
        throw new Error('The person role is not org');
    }

    const org_persons =  await Organization.query(Organization, {
      'selector': {
        'type':'did.organization',
        'person_id': organization.person_id
      }
    }) as any[];

    if(org_persons.length > 0){
      throw new Error('The Person already assign to an organization');
    }
    
    await organization.save();
  }


  @Invokable()
  public async assign_credential(
    @Param(yup.string())
    email: string,
    @Param(yup.string())
    credential_id: string,
    @Param(yup.array(PersonCredentialAttributeValue.schema()))
    attribute_values: Array<PersonCredentialAttributeValue>
  ) {

    var person = null;
    const results = await Person.query(Person, {
      'selector': {
        'type':'did.person',
        'email': email
      }
    }) as Person [];

    if(results.length == 0){
      throw new Error('Person does not exist');
    }else{
      person = results[0];
    }

    const credential = await Credential.getOne(credential_id);
    if (!credential || !credential.id) {
      throw new Error('Credential does not exist');
    }
    
    if(this.credential_exist(person.credentials,credential_id)){
      throw new Error('Credential already assigned to this person');
    }
    // console.log(person);
    // console.log(attribute_values);
    // console.log(credential);
    const person_credential = this.validate_credential_attributes(credential,attribute_values);
   
    person.credentials.push(person_credential);
    await person.save();
  }
  
  private validate_credential_attributes(credential:Credential, attribute_values:Array<FlatConvectorModel<PersonCredentialAttributeValue>>) {
    const errors: string [] = [];
    const person_credential:PersonCredential = new PersonCredential();
    const personCredentialAttributes:PersonCredentialAttribute [] = [];

    const credential_attributes = credential.attributes;
    for (let credential_attribute of credential_attributes) {
      var attr_exist = false;
      for (let attribute_value of attribute_values) {
        if (attribute_value.attribute_id == credential_attribute.attribute_id) {
          const personCredentialAttribute = new PersonCredentialAttribute(
              {
                attribute_id:credential_attribute.attribute_id,
                name:credential_attribute.name,
                value:attribute_value.value,
              }
            );
          personCredentialAttributes.push(personCredentialAttribute);
          attr_exist = true;
          continue;
        }
      }
      if (!attr_exist) {
        errors.push(credential_attribute.attribute_id);
      }
    }

    if (errors.length > 0) {
      throw new Error('attribute(s):' + errors.join(',') + " does not exists");
    } else {
      person_credential.attributes = personCredentialAttributes;
      person_credential.name = credential.name;
      person_credential.organization_name = credential.organization_name;
      person_credential.organization_logo = credential.organization_logo;
      person_credential.credential_id = credential.id;
      return person_credential;
    }
  }

  private credential_exist(credentials:Array<PersonCredential>,credential_id:string):boolean {
    for (let credential of credentials) {
      if(credential.credential_id == credential_id){
          return true;
      }
    }
     return false;
  }

  @Invokable()
  public async findByPersonId(
    @Param(yup.string())
    person_id:string
  ):Promise<Organization> {
    const organizations =  await Organization.query(Organization, {
      'selector': {
        'type':'did.organization',
        'person_id': person_id
      }
    }) as any[];
    if(organizations.length == 0){
      throw new Error('The person does not assigned to this organization');
    }else{
      return organizations[0];
    }
  }

}
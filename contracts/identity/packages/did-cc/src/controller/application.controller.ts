import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';
import * as yup from 'yup';
import {Person,Organization,Attribute,Credential,Application,ApplicationRequest,ApplicationCredential } from '../model';
import * as forge from 'node-forge';
const NodeRSA = require('node-rsa');
@Controller('application')
export class ApplicationController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async index() {   
    return await Application.getAll();
  }

  @Invokable()
  public async show( 
    @Param(yup.string())
    id: string
  ) {   
    const existing = await Application.getOne(id);
    if (!existing || !existing.id) {
      throw new Error('Application does not exist');
    }
    return existing;
  }

  @Invokable()
  public async create(
    @Param(Application)
    application: Application
  ) {
    const existing = await Attribute.getOne(application.id);
    if (existing && existing.id) {
      throw new Error('Application exists with that ID');
    }
    const person = await Person.getOne(application.person_id);
    if (!person || !person.id) {
      throw new Error('Person does not exist');
    }
    await application.save();
  }

  @Invokable()
  public async update(
    @Param(Application)
    application: Application
  ) {
    const existing = await Application.getOne(application.id);
    if (!existing || !existing.id) {
      throw new Error('Application does not exist');
    }
    const person = await Person.getOne(application.person_id);
    if (!person || !person.id) {
      throw new Error('Person does not exist');
    }
    await application.save();
  }

  @Invokable()
  public async delete(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Application.getOne(id);

    if (!existing || !existing.id) {
      throw new Error('Application does not exist');
    }
    await existing.delete();
  }

  @Invokable()
  public async myApplications(
    @Param(yup.string())
    person_id:string
  ) {
    const applications =  await Application.query(Application, {
      'selector': {
        'type':'did.application',
        'person_id': person_id
      }
    });
    return applications;
   
  }

  // @Invokable()
  // public async createRequest(
  //   @Param(ApplicationRequest)
  //   application_request: ApplicationRequest
  // ) {
  //   const existing = await ApplicationRequest.getOne(application_request.id);
  //   if (existing && existing.id) {
  //     throw new Error('Application Request exists with that ID');
  //   }
  //   const person = await Person.getOne(application_request.person_id);
  //   if (!person || !person.id) {
  //     throw new Error('Person does not exist');
  //   }
  //   const application = await Application.getOne(application_request.app_id);
  //   if (!application || !application.id) {
  //     throw new Error('Application does not exist');
  //   }

  //   const application_credentials = application_request.credentials;
  //   for(var i = 0; i < application_request.credentials.length; i++){
  //     const credential = await Credential.getOne(application_credentials[i].credential_id);
  //     if (!credential || !credential.id) {
  //         throw new Error('Credential ID: ' + application_credentials[i].credential_id + ' does not exist');
  //     }
  //     const application_credential_attribute_ids = application_credentials[i].attribute_ids;
      
  //     for(var j = 0; j < application_credential_attribute_ids.length; j++){
  //       const attribute = await Attribute.getOne(application_credential_attribute_ids[j]);
  //       if (!attribute || !attribute.id) {
  //           throw new Error('Attribute ID: ' + application_credential_attribute_ids[j] + ' does not exist');
  //       }        
  //     }
  //   }

  //   await application_request.save();
  // }

  @Invokable()
  public async showApplicationRequestInfo( 
    @Param(yup.string())
    app_id: string,
    @Param(yup.string())
    person_id: string,
    @Param(yup.boolean())
    email: boolean = false,
    @Param(yup.boolean())
    mobile: boolean = false,
    @Param(yup.array(ApplicationCredential.schema()))
    credentials:Array<ApplicationCredential>
  ) { 
    const application = await Application.getOne(app_id);

    if (!application || !application.id) {
      throw new Error('Application does not exist');
    }

    const person = await Person.getOne(person_id);

    if (!person || !person.id) {
      throw new Error('Person does not exist');
    }
    
    var personCredentials = person.credentials;

    var formatedCredentials = [];
    var totalFieldCount = 0;
    var totalValidFieldCount = 0;

    for(var i = 0; i < credentials.length; i++){
      const credential = await Credential.getOne(credentials[i].credential_id);
   
      if (!credential || !credential.id) {
        throw new Error('Invalid Request, credential_id:' + credentials[i].credential_id+' does not exists');
      }else{
           var formatedCredential = {
            credential_id: credential.id,
            name:credential.name,
            organization_logo:credential.organization_logo,
            organization_name:credential.organization_name,
            exists:false,
            attributes:[],
          };
          totalFieldCount++;
      }

      for(var j = 0; j < personCredentials.length; j++){
        if(credentials[i].credential_id == personCredentials[j].credential_id){
          //credential exists in this person
          formatedCredential.exists = true;
          totalValidFieldCount++;

          //check attributes
          var formatedAttributes = [];
          for(var k = 0; k < credentials[i].attribute_ids.length; k++){
            const attribute = await Attribute.getOne(credentials[i].attribute_ids[k]);
            if (!attribute || !attribute.id) {
              throw new Error('Invalid Request, attribute_id:' + credentials[i].attribute_ids[k] +' does not exists');
            }else{
                 var formatedAttribute = {
                  attribute_id: attribute.id,
                  name:attribute.name,
                  exists:false,
                };
                totalFieldCount++;
            }

            for(var l = 0; l < personCredentials[j].attributes.length; l++){
              if(credentials[i].attribute_ids[k] == personCredentials[j].attributes[l].attribute_id){
                formatedAttribute.exists = true;
                totalValidFieldCount++;
              }
            }
            formatedAttributes.push(formatedAttribute);
          }
        }
      }
      formatedCredential.attributes = formatedAttributes;
      formatedCredentials.push(formatedCredential);
    }

    const valid =  totalValidFieldCount == totalFieldCount;
    
    var data = {
      person:{
        id:person_id,
        email:email,
        mobile:mobile
      },
      application:{
        id:app_id,
        name: application.name,
      },
      credentials:formatedCredentials,
      valid
    }
    return data;
  }


  @Invokable()
  public async approveApplicationRequest( 
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    app_id: string,
    @Param(yup.string())
    person_id: string,
    @Param(yup.boolean())
    email: boolean,
    @Param(yup.boolean())
    mobile: boolean,
    @Param(yup.array(ApplicationCredential.schema()))
    credentials:Array<ApplicationCredential>
  ) { 
    const application = await Application.getOne(app_id);

    if (!application || !application.id) {
      throw new Error('Application does not exist');
    }

    const person = await Person.getOne(person_id);

    if (!person || !person.id) {
      throw new Error('Person does not exist');
    }
    
    var personCredentials = person.credentials;

    var formatedCredentials = [];
    var totalFieldCount = 0;
    var totalValidFieldCount = 0;

    for(var i = 0; i < credentials.length; i++){
      const credential = await Credential.getOne(credentials[i].credential_id);
   
      if (!credential || !credential.id) {
        throw new Error('Invalid Request, credential_id:' + credentials[i].credential_id+' does not exists');
      }else{
           var formatedCredential = {
            credential_id: credential.id,
            name:credential.name,
            organization_logo:credential.organization_logo,
            organization_name:credential.organization_name,
            //exists:false,
            attributes:[],
          };
          totalFieldCount++;
      }

      for(var j = 0; j < personCredentials.length; j++){
        if(credentials[i].credential_id == personCredentials[j].credential_id){
          //credential exists in this person
         // formatedCredential.exists = true;
          totalValidFieldCount++;

          //check attributes
          var formatedAttributes = [];
          for(var k = 0; k < credentials[i].attribute_ids.length; k++){
            const attribute = await Attribute.getOne(credentials[i].attribute_ids[k]);
            if (!attribute || !attribute.id) {
              throw new Error('Invalid Request, attribute_id:' + credentials[i].attribute_ids[k] +' does not exists');
            }else{
                 var formatedAttribute = {
                  attribute_id: attribute.id,
                  name:attribute.name,
                  value: null,
                  // exists:false,
                };
                totalFieldCount++;
            }

            for(var l = 0; l < personCredentials[j].attributes.length; l++){
              if(credentials[i].attribute_ids[k] == personCredentials[j].attributes[l].attribute_id){
                //formatedAttribute.exists = true;
                formatedAttribute.value = personCredentials[j].attributes[l].value;
                totalValidFieldCount++;
              }
            }
            formatedAttributes.push(formatedAttribute);
          }
        }
      }
      formatedCredential.attributes = formatedAttributes;
      formatedCredentials.push(formatedCredential);
    }

    const valid =  totalValidFieldCount == totalFieldCount;
    if(!valid){
      throw new Error('You have insufficient credential(s)/attribute(s) in your personal profile');
    }else{
      var credentialData = 
      {
        credentials:formatedCredentials,
        person:{
          id:person_id,
          email:email?person.email:null,
          mobile:mobile?person.mobile:null
        }
      };
      var credentialDataString = JSON.stringify(credentialData);
      var publicKey =  new NodeRSA(application.public_key);
      var data =  publicKey.encrypt(credentialDataString,'base64');

      // var dataObj = {
      //   application:{
      //     name: application.name,
      //   },
      //   data:encryptedCredentialData
      // }
     
      const applictionRequest = new ApplicationRequest({id,app_id,person_id,data});
      applictionRequest.save();
      return applictionRequest;
    }
    
  }

  @Invokable()
  public async getApplicationRequestData( 
    @Param(yup.string())
    id: string,
    @Param(yup.string())
    secret: string
  ) {   
    const applicationRequest = await ApplicationRequest.getOne(id);
    if (!applicationRequest || !applicationRequest.id) {
      throw new Error('Application Request does not exist');
    }
    const application = await Application.getOne(applicationRequest.app_id);
    if (application.secret != secret) {
      throw new Error('Application secret does not exist');
    }
    return applicationRequest;
  }
}
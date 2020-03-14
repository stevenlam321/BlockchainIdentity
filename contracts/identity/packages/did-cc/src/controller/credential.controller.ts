import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param,
  FlatConvectorModel
} from '@worldsibu/convector-core';
import * as yup from 'yup';
import {Person,Organization,Attribute,Credential } from '../model';

@Controller('credential')
export class CredentialController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async index() {   
    var result_json = [];
    
    const credentials = await Credential.getAll();
   
    const organizations = await Organization.getAll();

    credentials.forEach(credential => {
      organizations.forEach(organization => {
       if(credential.organization_id == organization.id){
          credential.organization = organization;
       }
      });
    });

    credentials.forEach(element => {
        result_json.push(new Credential(element).toJSON());
    });
    return result_json;
  }

  @Invokable()
  public async show( 
    @Param(yup.string())
    id: string
  ) {   
    const existing = await Credential.getOne(id);
    if (!existing || !existing.id) {
      throw new Error('Credential does not exist');
    }
    return existing;
  }

  @Invokable()
  public async create(
    @Param(Credential)
    credential: Credential
  ) {
    const existing = await Credential.getOne(credential.id);
    if (existing && existing.id) {
      throw new Error('Credential exists with that ID');
    }
    const organization = await Organization.getOne(credential.organization_id);

    if (!organization || !organization.id) {
      throw new Error('No such organization ID');
    }
    const error_attributes = [];
    const attributes = [];
    if(credential.attribute_ids.length > 0){
      for (let attribute_id of credential.attribute_ids) {
        const attribute = await Attribute.getOne(attribute_id);
           if(!attribute || !attribute.id){
              error_attributes.push(attribute_id);
           }else{
              attributes.push(attribute);
           }
      }
      if(error_attributes.length > 0){
        throw new Error('Invalid attribute_ids:' + error_attributes.join(','));
      }
    }
    if(attributes.length > 0){
       credential.attributes = attributes;
    }
    delete credential.attribute_ids;
    await credential.save();
  }

  @Invokable()
  public async update(
    @Param(Credential)
    credential: Credential
  ) {
    const existing = await Credential.getOne(credential.id);
    if (!existing || !existing.id) {
      throw new Error('Credential does not exist');
    }
    await credential.save();
  }

  @Invokable()
  public async add_attribute(
    @Param(yup.string())
    credential_id:string,
    @Param(yup.array(yup.string()))
    attribute_ids: string[]
  ) {
    // const credential = await Credential.getOne(credential_id);
    // if (!credential || !credential.id) {
    //   throw new Error('Credential does not exist');
    // }
    // const attribute = await Attribute.getOne(attribute_id);
    // if (!attribute || !attribute.id) {
    //   throw new Error('Attribute does not exist');
    // }
    // var credential_attributes = credential.credential_attributes;

    // if(this.attribute_exist(credential_attributes,attribute_id)){
    //   throw new Error('Attribute already exist');
    // }

    // const new_credential_attribute = {
    //   attribute_id,
    //   name: attribute.name
    // };
    // credential_attributes.push(new_credential_attribute);
  
    // credential.credential_attributes = credential_attributes;
    // await credential.save();
  }

  @Invokable()
  public async delete_attribute(
    @Param(yup.string())
    credential_id:string,
    @Param(yup.string())
    attribute_id:string
  ) {
    // const credential = await Credential.getOne(credential_id);
    // if (!credential || !credential.id) {
    //   throw new Error('Credential does not exist');
    // }

    // var credential_attributes = credential.credential_attributes;

    // if(!this.attribute_exist(credential_attributes,attribute_id)){
    //   throw new Error('Attribute does not exist');
    // }
    // credential_attributes = credential_attributes.filter(credential_attribute => credential_attribute.attribute_id != attribute_id);
  
    // credential.credential_attributes = credential_attributes;
    // await credential.save();
  }

  // @Invokable()
  // public async delete(
  //   @Param(yup.string())
  //   id: string
  // ) {
  //   const existing = await Credential.getOne(id);

  //   if (!existing || !existing.id) {
  //     throw new Error('Credential does not exist');
  //   }
  //   await existing.delete();
  // }
  
  private attribute_exist(credential_attributes:Array<FlatConvectorModel<Attribute>>,attribute_id:string):boolean {
    // for (let credential_attribute of credential_attributes) {
    //   if(credential_attribute.attribute_id == attribute_id){
    //       return true;
    //   }
    // }
    return false;
  }
}
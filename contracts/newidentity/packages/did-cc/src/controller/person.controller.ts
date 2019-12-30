import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';
import * as yup from 'yup';

import {Person,Organization,Attribute,Credential } from '../model';

@Controller('person')
export class PersonController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async index() {   
    return await Person.getAll();
  }

  @Invokable()
  public async show( 
    @Param(yup.string())
    id: string
  ) {   
    const existing = await Person.getOne(id);
    if (!existing || !existing.id) {
      throw new Error('Person does not exist');
    }
    return existing;
  }

  @Invokable()
  public async create(
    @Param(Person)
    person: Person
  ) {
    const existing = await Person.getOne(person.id);
    if (existing && existing.id) {
      throw new Error('Person exists with that ID');
    }
    await person.save();
  }

  @Invokable()
  public async update(
    @Param(Person)
    person: Person
  ) {
    const existing = await Person.getOne(person.id);
    if (!existing || !existing.id) {
      throw new Error('Person does not exist');
    }
    await person.save();
  }

  @Invokable()
  public async delete(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Person.getOne(id);

    if (!existing || !existing.id) {
      throw new Error('Person does not exist');
    }
    await existing.delete();
  }

  @Invokable()
  public async getPerson(
    // @Param(yup.string())
    // id:string,
    @Param(yup.string())
    value:string
  ) {
    return await Person.query(Person, {
      'selector': {
        'type':'did.person',
        'email': value
      }
    });
  }


}

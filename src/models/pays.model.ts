import {Entity, model, property} from '@loopback/repository';

@model()
export class Pays extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nom: string;

  @property({
    type: 'object',
  })
  drapeau?: object;

  @property({
    type: 'string',
    required: true,
  })
  codeisonum: string;

  @property({
    type: 'string',
    required: true,
  })
  codeisoalpha: string;


  constructor(data?: Partial<Pays>) {
    super(data);
  }
}

export interface PaysRelations {
  // describe navigational properties here
}

export type PaysWithRelations = Pays & PaysRelations;

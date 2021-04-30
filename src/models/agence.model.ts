import {Entity, model, property} from '@loopback/repository';

@model()
export class Agence extends Entity {
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
  adresse: string;

  @property({
    type: 'string',
  })
  banqueId?: string;

  constructor(data?: Partial<Agence>) {
    super(data);
  }
}

export interface AgenceRelations {
  // describe navigational properties here
}

export type AgenceWithRelations = Agence & AgenceRelations;

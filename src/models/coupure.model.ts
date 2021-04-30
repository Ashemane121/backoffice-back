import {Entity, model, property} from '@loopback/repository';

@model()
export class Coupure extends Entity {
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
    type: 'number',
    required: true,
  })
  valeur: number;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'string',
  })
  deviseId?: string;

  constructor(data?: Partial<Coupure>) {
    super(data);
  }
}

export interface CoupureRelations {
  // describe navigational properties here
}

export type CoupureWithRelations = Coupure & CoupureRelations;

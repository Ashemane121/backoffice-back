import {Entity, model, property} from '@loopback/repository';

@model()
export class Ligcaibur extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  montant: number;

  @property({
    type: 'string',
  })
  bureauId?: string;

  @property({
    type: 'string',
  })
  deviseId?: string;

  constructor(data?: Partial<Ligcaibur>) {
    super(data);
  }
}

export interface LigcaiburRelations {
  // describe navigational properties here
}

export type LigcaiburWithRelations = Ligcaibur & LigcaiburRelations;

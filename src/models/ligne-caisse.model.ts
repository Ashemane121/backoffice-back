import {Entity, model, property} from '@loopback/repository';

@model()
export class LigneCaisse extends Entity {
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
  caisseId?: string;

  constructor(data?: Partial<LigneCaisse>) {
    super(data);
  }
}

export interface LigneCaisseRelations {
  // describe navigational properties here
}

export type LigneCaisseWithRelations = LigneCaisse & LigneCaisseRelations;

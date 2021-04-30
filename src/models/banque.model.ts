import {Entity, model, property, hasMany} from '@loopback/repository';
import {Agence} from './agence.model';

@model()
export class Banque extends Entity {
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
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  nom: string;

  @hasMany(() => Agence)
  agences: Agence[];

  constructor(data?: Partial<Banque>) {
    super(data);
  }
}

export interface BanqueRelations {
  // describe navigational properties here
}

export type BanqueWithRelations = Banque & BanqueRelations;

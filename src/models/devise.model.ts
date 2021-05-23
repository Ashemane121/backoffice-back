import {Entity, hasMany, model, property} from '@loopback/repository';
import {Coupure} from './coupure.model';
import {Ligcaibur} from './ligcaibur.model';

@model()
export class Devise extends Entity {
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
    type: 'string',
    required: true,
  })
  code: string;

  @hasMany(() => Coupure)
  coupures: Coupure[];

  @hasMany(() => Ligcaibur)
  ligcaiburs: Ligcaibur[];

  constructor(data?: Partial<Devise>) {
    super(data);
  }
}

export interface DeviseRelations {
  // describe navigational properties here
}

export type DeviseWithRelations = Devise & DeviseRelations;

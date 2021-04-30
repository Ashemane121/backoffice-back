import {Entity, model, property, hasMany} from '@loopback/repository';
import {LigneCaisse} from './ligne-caisse.model';

@model()
export class Caisse extends Entity {
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
  ref: string;

  @property({
    type: 'boolean',
    required: true,
  })
  etat: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  state: boolean;

  @hasMany(() => LigneCaisse)
  ligneCaisses: LigneCaisse[];

  @property({
    type: 'string',
  })
  utilisateurId?: string;

  constructor(data?: Partial<Caisse>) {
    super(data);
  }
}

export interface CaisseRelations {
  // describe navigational properties here
}

export type CaisseWithRelations = Caisse & CaisseRelations;

import {Entity, model, property, hasOne} from '@loopback/repository';
import {Caisse} from './caisse.model';

@model()
export class Utilisateur extends Entity {
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
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  nom: string;

  @property({
    type: 'string',
    required: true,
  })
  prenom: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  cin: string;

  @hasOne(() => Caisse)
  caisse: Caisse;

  constructor(data?: Partial<Utilisateur>) {
    super(data);
  }
}

export interface UtilisateurRelations {
  // describe navigational properties here
}

export type UtilisateurWithRelations = Utilisateur & UtilisateurRelations;

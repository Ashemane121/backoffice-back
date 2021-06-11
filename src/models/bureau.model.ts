import {Entity, hasMany, model, property} from '@loopback/repository';
import {Association} from './association.model';
import {Produit} from './produit.model';
import {UtiBureau} from './uti-bureau.model';
import {Utilisateur} from './utilisateur.model';
import {Ligcaibur} from './ligcaibur.model';
import {Stat} from './stat.model';

@model()
export class Bureau extends Entity {
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
  idbct: string;

  @hasMany(() => Produit, {through: {model: () => Association}})
  produits: Produit[];

  @hasMany(() => Utilisateur, {through: {model: () => UtiBureau}})
  utilisateurs: Utilisateur[];



  @property({
    type: 'string',
    required: true,
  })
  adresse: string;

  @property({
    type: 'string',
    required: true,
  })
  nombureau: string;

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

  @property({
    type: 'string',
    required: true,
  })
  mdp: string;

  @property({
    type: 'boolean',
    required: true,
  })
  actif: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  visible: boolean;

  @hasMany(() => Ligcaibur)
  ligcaiburs: Ligcaibur[];

  @hasMany(() => Association, {through: {model: () => Stat}})
  associations: Association[];

  constructor(data?: Partial<Bureau>) {
    super(data);
  }
}

export interface BureauRelations {
  // describe navigational properties here
}

export type BureauWithRelations = Bureau & BureauRelations;

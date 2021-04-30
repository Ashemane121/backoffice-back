import {Entity, model, property} from '@loopback/repository';

@model()
export class UtiBureau extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  bureauId?: string;

  @property({
    type: 'string',
  })
  utilisateurId?: string;

  constructor(data?: Partial<UtiBureau>) {
    super(data);
  }
}

export interface UtiBureauRelations {
  // describe navigational properties here
}

export type UtiBureauWithRelations = UtiBureau & UtiBureauRelations;

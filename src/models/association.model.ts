import {Entity, model, property} from '@loopback/repository';

@model()
export class Association extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
    jsonSchema: {
      format: 'date',
    },
  })
  dateecheance: string;

  @property({
    type: 'string',
  })
  bureauId?: string;

  @property({
    type: 'string',
  })
  produitId?: string;



  @property({
    type: 'number',
    required: true,
  })
  remise: number;


  constructor(data?: Partial<Association>) {
    super(data);
  }
}

export interface AssociationRelations {
  // describe navigational properties here
}

export type AssociationWithRelations = Association & AssociationRelations;

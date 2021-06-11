import {Entity, model, property} from '@loopback/repository';

@model()
export class Stat extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  datevalide: boolean;

  @property({
    type: 'string',
  })
  bureauId?: string;

  @property({
    type: 'string',
  })
  associationId?: string;

  constructor(data?: Partial<Stat>) {
    super(data);
  }
}

export interface StatRelations {
  // describe navigational properties here
}

export type StatWithRelations = Stat & StatRelations;

import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Devise,
  Coupure,
} from '../models';
import {DeviseRepository} from '../repositories';

export class DeviseCoupureController {
  constructor(
    @repository(DeviseRepository) protected deviseRepository: DeviseRepository,
  ) { }

  @get('/devises/{id}/coupures', {
    responses: {
      '200': {
        description: 'Array of Devise has many Coupure',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Coupure)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Coupure>,
  ): Promise<Coupure[]> {
    return this.deviseRepository.coupures(id).find(filter);
  }

  @post('/devises/{id}/coupures', {
    responses: {
      '200': {
        description: 'Devise model instance',
        content: {'application/json': {schema: getModelSchemaRef(Coupure)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Devise.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coupure, {
            title: 'NewCoupureInDevise',
            exclude: ['id'],
            optional: ['deviseId']
          }),
        },
      },
    }) coupure: Omit<Coupure, 'id'>,
  ): Promise<Coupure> {
    return this.deviseRepository.coupures(id).create(coupure);
  }

  @patch('/devises/{id}/coupures', {
    responses: {
      '200': {
        description: 'Devise.Coupure PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coupure, {partial: true}),
        },
      },
    })
    coupure: Partial<Coupure>,
    @param.query.object('where', getWhereSchemaFor(Coupure)) where?: Where<Coupure>,
  ): Promise<Count> {
    return this.deviseRepository.coupures(id).patch(coupure, where);
  }

  @del('/devises/{id}/coupures', {
    responses: {
      '200': {
        description: 'Devise.Coupure DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Coupure)) where?: Where<Coupure>,
  ): Promise<Count> {
    return this.deviseRepository.coupures(id).delete(where);
  }
}

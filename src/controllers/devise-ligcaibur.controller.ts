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
  Ligcaibur,
} from '../models';
import {DeviseRepository} from '../repositories';

export class DeviseLigcaiburController {
  constructor(
    @repository(DeviseRepository) protected deviseRepository: DeviseRepository,
  ) { }

  @get('/devises/{id}/ligcaiburs', {
    responses: {
      '200': {
        description: 'Array of Devise has many Ligcaibur',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ligcaibur)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ligcaibur>,
  ): Promise<Ligcaibur[]> {
    return this.deviseRepository.ligcaiburs(id).find(filter);
  }

  @post('/devises/{id}/ligcaiburs', {
    responses: {
      '200': {
        description: 'Devise model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ligcaibur)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Devise.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ligcaibur, {
            title: 'NewLigcaiburInDevise',
            exclude: ['id'],
            optional: ['deviseId']
          }),
        },
      },
    }) ligcaibur: Omit<Ligcaibur, 'id'>,
  ): Promise<Ligcaibur> {
    return this.deviseRepository.ligcaiburs(id).create(ligcaibur);
  }

  @patch('/devises/{id}/ligcaiburs', {
    responses: {
      '200': {
        description: 'Devise.Ligcaibur PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ligcaibur, {partial: true}),
        },
      },
    })
    ligcaibur: Partial<Ligcaibur>,
    @param.query.object('where', getWhereSchemaFor(Ligcaibur)) where?: Where<Ligcaibur>,
  ): Promise<Count> {
    return this.deviseRepository.ligcaiburs(id).patch(ligcaibur, where);
  }

  @del('/devises/{id}/ligcaiburs', {
    responses: {
      '200': {
        description: 'Devise.Ligcaibur DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ligcaibur)) where?: Where<Ligcaibur>,
  ): Promise<Count> {
    return this.deviseRepository.ligcaiburs(id).delete(where);
  }
}

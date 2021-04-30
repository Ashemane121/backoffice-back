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
  Banque,
  Agence,
} from '../models';
import {BanqueRepository} from '../repositories';

export class BanqueAgenceController {
  constructor(
    @repository(BanqueRepository) protected banqueRepository: BanqueRepository,
  ) { }

  @get('/banques/{id}/agences', {
    responses: {
      '200': {
        description: 'Array of Banque has many Agence',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Agence)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Agence>,
  ): Promise<Agence[]> {
    return this.banqueRepository.agences(id).find(filter);
  }

  @post('/banques/{id}/agences', {
    responses: {
      '200': {
        description: 'Banque model instance',
        content: {'application/json': {schema: getModelSchemaRef(Agence)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Banque.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agence, {
            title: 'NewAgenceInBanque',
            exclude: ['id'],
            optional: ['banqueId']
          }),
        },
      },
    }) agence: Omit<Agence, 'id'>,
  ): Promise<Agence> {
    return this.banqueRepository.agences(id).create(agence);
  }

  @patch('/banques/{id}/agences', {
    responses: {
      '200': {
        description: 'Banque.Agence PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agence, {partial: true}),
        },
      },
    })
    agence: Partial<Agence>,
    @param.query.object('where', getWhereSchemaFor(Agence)) where?: Where<Agence>,
  ): Promise<Count> {
    return this.banqueRepository.agences(id).patch(agence, where);
  }

  @del('/banques/{id}/agences', {
    responses: {
      '200': {
        description: 'Banque.Agence DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Agence)) where?: Where<Agence>,
  ): Promise<Count> {
    return this.banqueRepository.agences(id).delete(where);
  }
}

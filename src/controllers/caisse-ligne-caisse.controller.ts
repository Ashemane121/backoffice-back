import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Caisse,
  LigneCaisse
} from '../models';
import {CaisseRepository} from '../repositories';

@authenticate('jwt')
export class CaisseLigneCaisseController {
  constructor(
    @repository(CaisseRepository) protected caisseRepository: CaisseRepository,
  ) { }

  @get('/caisses/ligne-caisses/{id}', {
    responses: {
      '200': {
        description: 'Array of Caisse has many LigneCaisse',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LigneCaisse)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<LigneCaisse>,
  ): Promise<LigneCaisse[]> {
    return this.caisseRepository.ligneCaisses(id).find(filter);
  }

  @post('/caisses/ligne-caisses/{id}', {
    responses: {
      '200': {
        description: 'Caisse model instance',
        content: {'application/json': {schema: getModelSchemaRef(LigneCaisse)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Caisse.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LigneCaisse, {
            title: 'NewLigneCaisseInCaisse',
            exclude: ['id'],
            optional: ['caisseId']
          }),
        },
      },
    }) ligneCaisse: Omit<LigneCaisse, 'id'>,
  ): Promise<LigneCaisse> {
    return this.caisseRepository.ligneCaisses(id).create(ligneCaisse);
  }

  @patch('/caisses/ligne-caisses/{id}', {
    responses: {
      '200': {
        description: 'Caisse.LigneCaisse PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LigneCaisse, {partial: true}),
        },
      },
    })
    ligneCaisse: Partial<LigneCaisse>,
    @param.query.object('where', getWhereSchemaFor(LigneCaisse)) where?: Where<LigneCaisse>,
  ): Promise<Count> {
    return this.caisseRepository.ligneCaisses(id).patch(ligneCaisse, where);
  }

  @del('/caisses/ligne-caisses/{id}', {
    responses: {
      '200': {
        description: 'Caisse.LigneCaisse DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(LigneCaisse)) where?: Where<LigneCaisse>,
  ): Promise<Count> {
    return this.caisseRepository.ligneCaisses(id).delete(where);
  }
}

import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Caisse} from '../models';
import {CaisseRepository} from '../repositories';

@authenticate('jwt')
export class CaisseController {
  constructor(
    @repository(CaisseRepository)
    public caisseRepository: CaisseRepository,
  ) { }

  @post('/caisses')
  @response(200, {
    description: 'Caisse model instance',
    content: {'application/json': {schema: getModelSchemaRef(Caisse)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Caisse, {
            title: 'NewCaisse',
            exclude: ['id'],
          }),
        },
      },
    })
    caisse: Omit<Caisse, 'id'>,
  ): Promise<Caisse> {
    return this.caisseRepository.create(caisse);
  }

  @get('/caisses/count')
  @response(200, {
    description: 'Caisse model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Caisse) where?: Where<Caisse>,
  ): Promise<Count> {
    return this.caisseRepository.count(where);
  }

  @get('/caisses')
  @response(200, {
    description: 'Array of Caisse model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Caisse, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Caisse) filter?: Filter<Caisse>,
  ): Promise<Caisse[]> {
    return this.caisseRepository.find(filter);
  }

  @patch('/caisses')
  @response(200, {
    description: 'Caisse PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Caisse, {partial: true}),
        },
      },
    })
    caisse: Caisse,
    @param.where(Caisse) where?: Where<Caisse>,
  ): Promise<Count> {
    return this.caisseRepository.updateAll(caisse, where);
  }

  @get('/caisses/{id}')
  @response(200, {
    description: 'Caisse model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Caisse, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Caisse, {exclude: 'where'}) filter?: FilterExcludingWhere<Caisse>
  ): Promise<Caisse> {
    return this.caisseRepository.findById(id, filter);
  }

  @patch('/caisses/{id}')
  @response(204, {
    description: 'Caisse PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Caisse, {partial: true}),
        },
      },
    })
    caisse: Caisse,
  ): Promise<void> {
    await this.caisseRepository.updateById(id, caisse);
  }

  @put('/caisses/{id}')
  @response(204, {
    description: 'Caisse PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() caisse: Caisse,
  ): Promise<void> {
    await this.caisseRepository.replaceById(id, caisse);
  }

  @del('/caisses/{id}')
  @response(204, {
    description: 'Caisse DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.caisseRepository.deleteById(id);
  }
}

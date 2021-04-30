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
import {LigneCaisse} from '../models';
import {LigneCaisseRepository} from '../repositories';

@authenticate('jwt')
export class LigcaisseController {
  constructor(
    @repository(LigneCaisseRepository)
    public ligneCaisseRepository: LigneCaisseRepository,
  ) { }

  @post('/ligne-caisses')
  @response(200, {
    description: 'LigneCaisse model instance',
    content: {'application/json': {schema: getModelSchemaRef(LigneCaisse)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LigneCaisse, {
            title: 'NewLigneCaisse',
            exclude: ['id'],
          }),
        },
      },
    })
    ligneCaisse: Omit<LigneCaisse, 'id'>,
  ): Promise<LigneCaisse> {
    return this.ligneCaisseRepository.create(ligneCaisse);
  }

  @get('/ligne-caisses/count')
  @response(200, {
    description: 'LigneCaisse model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LigneCaisse) where?: Where<LigneCaisse>,
  ): Promise<Count> {
    return this.ligneCaisseRepository.count(where);
  }

  @get('/ligne-caisses')
  @response(200, {
    description: 'Array of LigneCaisse model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LigneCaisse, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LigneCaisse) filter?: Filter<LigneCaisse>,
  ): Promise<LigneCaisse[]> {
    return this.ligneCaisseRepository.find(filter);
  }

  @patch('/ligne-caisses')
  @response(200, {
    description: 'LigneCaisse PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LigneCaisse, {partial: true}),
        },
      },
    })
    ligneCaisse: LigneCaisse,
    @param.where(LigneCaisse) where?: Where<LigneCaisse>,
  ): Promise<Count> {
    return this.ligneCaisseRepository.updateAll(ligneCaisse, where);
  }

  @get('/ligne-caisses/{id}')
  @response(200, {
    description: 'LigneCaisse model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LigneCaisse, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(LigneCaisse, {exclude: 'where'}) filter?: FilterExcludingWhere<LigneCaisse>
  ): Promise<LigneCaisse> {
    return this.ligneCaisseRepository.findById(id, filter);
  }

  @patch('/ligne-caisses/{id}')
  @response(204, {
    description: 'LigneCaisse PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LigneCaisse, {partial: true}),
        },
      },
    })
    ligneCaisse: LigneCaisse,
  ): Promise<void> {
    await this.ligneCaisseRepository.updateById(id, ligneCaisse);
  }

  @put('/ligne-caisses/{id}')
  @response(204, {
    description: 'LigneCaisse PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ligneCaisse: LigneCaisse,
  ): Promise<void> {
    await this.ligneCaisseRepository.replaceById(id, ligneCaisse);
  }

  @del('/ligne-caisses/{id}')
  @response(204, {
    description: 'LigneCaisse DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ligneCaisseRepository.deleteById(id);
  }
}

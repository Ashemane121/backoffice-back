import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Stat} from '../models';
import {StatRepository} from '../repositories';

export class StatController {
  constructor(
    @repository(StatRepository)
    public statRepository : StatRepository,
  ) {}

  @post('/stats')
  @response(200, {
    description: 'Stat model instance',
    content: {'application/json': {schema: getModelSchemaRef(Stat)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stat, {
            title: 'NewStat',
            exclude: ['id'],
          }),
        },
      },
    })
    stat: Omit<Stat, 'id'>,
  ): Promise<Stat> {
    return this.statRepository.create(stat);
  }

  @get('/stats/count')
  @response(200, {
    description: 'Stat model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Stat) where?: Where<Stat>,
  ): Promise<Count> {
    return this.statRepository.count(where);
  }

  @get('/stats')
  @response(200, {
    description: 'Array of Stat model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Stat, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Stat) filter?: Filter<Stat>,
  ): Promise<Stat[]> {
    return this.statRepository.find(filter);
  }

  @patch('/stats')
  @response(200, {
    description: 'Stat PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stat, {partial: true}),
        },
      },
    })
    stat: Stat,
    @param.where(Stat) where?: Where<Stat>,
  ): Promise<Count> {
    return this.statRepository.updateAll(stat, where);
  }

  @get('/stats/{id}')
  @response(200, {
    description: 'Stat model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Stat, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Stat, {exclude: 'where'}) filter?: FilterExcludingWhere<Stat>
  ): Promise<Stat> {
    return this.statRepository.findById(id, filter);
  }

  @patch('/stats/{id}')
  @response(204, {
    description: 'Stat PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stat, {partial: true}),
        },
      },
    })
    stat: Stat,
  ): Promise<void> {
    await this.statRepository.updateById(id, stat);
  }

  @put('/stats/{id}')
  @response(204, {
    description: 'Stat PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() stat: Stat,
  ): Promise<void> {
    await this.statRepository.replaceById(id, stat);
  }

  @del('/stats/{id}')
  @response(204, {
    description: 'Stat DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.statRepository.deleteById(id);
  }
}

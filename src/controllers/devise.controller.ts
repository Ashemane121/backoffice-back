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
import {Devise} from '../models';
import {DeviseRepository} from '../repositories';

export class DeviseController {
  constructor(
    @repository(DeviseRepository)
    public deviseRepository : DeviseRepository,
  ) {}

  @post('/devises')
  @response(200, {
    description: 'Devise model instance',
    content: {'application/json': {schema: getModelSchemaRef(Devise)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Devise, {
            title: 'NewDevise',
            exclude: ['id'],
          }),
        },
      },
    })
    devise: Omit<Devise, 'id'>,
  ): Promise<Devise> {
    return this.deviseRepository.create(devise);
  }

  @get('/devises/count')
  @response(200, {
    description: 'Devise model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Devise) where?: Where<Devise>,
  ): Promise<Count> {
    return this.deviseRepository.count(where);
  }

  @get('/devises')
  @response(200, {
    description: 'Array of Devise model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Devise, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Devise) filter?: Filter<Devise>,
  ): Promise<Devise[]> {
    return this.deviseRepository.find(filter);
  }

  @patch('/devises')
  @response(200, {
    description: 'Devise PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Devise, {partial: true}),
        },
      },
    })
    devise: Devise,
    @param.where(Devise) where?: Where<Devise>,
  ): Promise<Count> {
    return this.deviseRepository.updateAll(devise, where);
  }

  @get('/devises/{id}')
  @response(200, {
    description: 'Devise model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Devise, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Devise, {exclude: 'where'}) filter?: FilterExcludingWhere<Devise>
  ): Promise<Devise> {
    return this.deviseRepository.findById(id, filter);
  }

  @patch('/devises/{id}')
  @response(204, {
    description: 'Devise PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Devise, {partial: true}),
        },
      },
    })
    devise: Devise,
  ): Promise<void> {
    await this.deviseRepository.updateById(id, devise);
  }

  @put('/devises/{id}')
  @response(204, {
    description: 'Devise PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() devise: Devise,
  ): Promise<void> {
    await this.deviseRepository.replaceById(id, devise);
  }

  @del('/devises/{id}')
  @response(204, {
    description: 'Devise DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.deviseRepository.deleteById(id);
  }
}

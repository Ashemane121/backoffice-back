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
import {Agence} from '../models';
import {AgenceRepository} from '../repositories';

export class AgenceController {
  constructor(
    @repository(AgenceRepository)
    public agenceRepository : AgenceRepository,
  ) {}

  @post('/agences')
  @response(200, {
    description: 'Agence model instance',
    content: {'application/json': {schema: getModelSchemaRef(Agence)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agence, {
            title: 'NewAgence',
            exclude: ['id'],
          }),
        },
      },
    })
    agence: Omit<Agence, 'id'>,
  ): Promise<Agence> {
    return this.agenceRepository.create(agence);
  }

  @get('/agences/count')
  @response(200, {
    description: 'Agence model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Agence) where?: Where<Agence>,
  ): Promise<Count> {
    return this.agenceRepository.count(where);
  }

  @get('/agences')
  @response(200, {
    description: 'Array of Agence model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Agence, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Agence) filter?: Filter<Agence>,
  ): Promise<Agence[]> {
    return this.agenceRepository.find(filter);
  }

  @patch('/agences')
  @response(200, {
    description: 'Agence PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agence, {partial: true}),
        },
      },
    })
    agence: Agence,
    @param.where(Agence) where?: Where<Agence>,
  ): Promise<Count> {
    return this.agenceRepository.updateAll(agence, where);
  }

  @get('/agences/{id}')
  @response(200, {
    description: 'Agence model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Agence, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Agence, {exclude: 'where'}) filter?: FilterExcludingWhere<Agence>
  ): Promise<Agence> {
    return this.agenceRepository.findById(id, filter);
  }

  @patch('/agences/{id}')
  @response(204, {
    description: 'Agence PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agence, {partial: true}),
        },
      },
    })
    agence: Agence,
  ): Promise<void> {
    await this.agenceRepository.updateById(id, agence);
  }

  @put('/agences/{id}')
  @response(204, {
    description: 'Agence PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() agence: Agence,
  ): Promise<void> {
    await this.agenceRepository.replaceById(id, agence);
  }

  @del('/agences/{id}')
  @response(204, {
    description: 'Agence DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.agenceRepository.deleteById(id);
  }
}

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
import {Banque} from '../models';
import {BanqueRepository} from '../repositories';

export class BanqueController {
  constructor(
    @repository(BanqueRepository)
    public banqueRepository : BanqueRepository,
  ) {}

  @post('/banques')
  @response(200, {
    description: 'Banque model instance',
    content: {'application/json': {schema: getModelSchemaRef(Banque)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Banque, {
            title: 'NewBanque',
            exclude: ['id'],
          }),
        },
      },
    })
    banque: Omit<Banque, 'id'>,
  ): Promise<Banque> {
    return this.banqueRepository.create(banque);
  }

  @get('/banques/count')
  @response(200, {
    description: 'Banque model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Banque) where?: Where<Banque>,
  ): Promise<Count> {
    return this.banqueRepository.count(where);
  }

  @get('/banques')
  @response(200, {
    description: 'Array of Banque model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Banque, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Banque) filter?: Filter<Banque>,
  ): Promise<Banque[]> {
    return this.banqueRepository.find(filter);
  }

  @patch('/banques')
  @response(200, {
    description: 'Banque PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Banque, {partial: true}),
        },
      },
    })
    banque: Banque,
    @param.where(Banque) where?: Where<Banque>,
  ): Promise<Count> {
    return this.banqueRepository.updateAll(banque, where);
  }

  @get('/banques/{id}')
  @response(200, {
    description: 'Banque model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Banque, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Banque, {exclude: 'where'}) filter?: FilterExcludingWhere<Banque>
  ): Promise<Banque> {
    return this.banqueRepository.findById(id, filter);
  }

  @patch('/banques/{id}')
  @response(204, {
    description: 'Banque PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Banque, {partial: true}),
        },
      },
    })
    banque: Banque,
  ): Promise<void> {
    await this.banqueRepository.updateById(id, banque);
  }

  @put('/banques/{id}')
  @response(204, {
    description: 'Banque PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() banque: Banque,
  ): Promise<void> {
    await this.banqueRepository.replaceById(id, banque);
  }

  @del('/banques/{id}')
  @response(204, {
    description: 'Banque DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.banqueRepository.deleteById(id);
  }
}

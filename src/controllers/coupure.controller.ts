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
import {Coupure} from '../models';
import {CoupureRepository} from '../repositories';

export class CoupureController {
  constructor(
    @repository(CoupureRepository)
    public coupureRepository : CoupureRepository,
  ) {}

  @post('/coupures')
  @response(200, {
    description: 'Coupure model instance',
    content: {'application/json': {schema: getModelSchemaRef(Coupure)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coupure, {
            title: 'NewCoupure',
            exclude: ['id'],
          }),
        },
      },
    })
    coupure: Omit<Coupure, 'id'>,
  ): Promise<Coupure> {
    return this.coupureRepository.create(coupure);
  }

  @get('/coupures/count')
  @response(200, {
    description: 'Coupure model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Coupure) where?: Where<Coupure>,
  ): Promise<Count> {
    return this.coupureRepository.count(where);
  }

  @get('/coupures')
  @response(200, {
    description: 'Array of Coupure model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Coupure, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Coupure) filter?: Filter<Coupure>,
  ): Promise<Coupure[]> {
    return this.coupureRepository.find(filter);
  }

  @patch('/coupures')
  @response(200, {
    description: 'Coupure PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coupure, {partial: true}),
        },
      },
    })
    coupure: Coupure,
    @param.where(Coupure) where?: Where<Coupure>,
  ): Promise<Count> {
    return this.coupureRepository.updateAll(coupure, where);
  }

  @get('/coupures/{id}')
  @response(200, {
    description: 'Coupure model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Coupure, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Coupure, {exclude: 'where'}) filter?: FilterExcludingWhere<Coupure>
  ): Promise<Coupure> {
    return this.coupureRepository.findById(id, filter);
  }

  @patch('/coupures/{id}')
  @response(204, {
    description: 'Coupure PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Coupure, {partial: true}),
        },
      },
    })
    coupure: Coupure,
  ): Promise<void> {
    await this.coupureRepository.updateById(id, coupure);
  }

  @put('/coupures/{id}')
  @response(204, {
    description: 'Coupure PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() coupure: Coupure,
  ): Promise<void> {
    await this.coupureRepository.replaceById(id, coupure);
  }

  @del('/coupures/{id}')
  @response(204, {
    description: 'Coupure DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.coupureRepository.deleteById(id);
  }
}

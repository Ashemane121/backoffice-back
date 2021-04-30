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
import {Bureau} from '../models';
import {BureauRepository} from '../repositories';

@authenticate('jwt')
export class BureauController {
  constructor(
    @repository(BureauRepository)
    public bureauRepository: BureauRepository,
  ) { }

  @post('/bureaux')
  @response(200, {
    description: 'Bureau model instance',
    content: {'application/json': {schema: getModelSchemaRef(Bureau)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bureau, {
            title: 'NewBureau',
            exclude: ['id'],
          }),
        },
      },
    })
    bureau: Omit<Bureau, 'id'>,
  ): Promise<Bureau> {
    return this.bureauRepository.create(bureau);
  }

  @get('/bureaux/count')
  @response(200, {
    description: 'Bureau model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Bureau) where?: Where<Bureau>,
  ): Promise<Count> {
    return this.bureauRepository.count(where);
  }

  @get('/bureaux')
  @response(200, {
    description: 'Array of Bureau model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Bureau, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Bureau) filter?: Filter<Bureau>,
  ): Promise<Bureau[]> {
    return this.bureauRepository.find(filter);
  }

  @patch('/bureaux')
  @response(200, {
    description: 'Bureau PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bureau, {partial: true}),
        },
      },
    })
    bureau: Bureau,
    @param.where(Bureau) where?: Where<Bureau>,
  ): Promise<Count> {
    return this.bureauRepository.updateAll(bureau, where);
  }

  @get('/bureaux/{id}')
  @response(200, {
    description: 'Bureau model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Bureau, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Bureau, {exclude: 'where'}) filter?: FilterExcludingWhere<Bureau>
  ): Promise<Bureau> {
    return this.bureauRepository.findById(id, filter);
  }

  @patch('/bureaux/{id}')
  @response(204, {
    description: 'Bureau PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bureau, {partial: true}),
        },
      },
    })
    bureau: Bureau,
  ): Promise<void> {
    await this.bureauRepository.updateById(id, bureau);
  }

  @put('/bureaux/{id}')
  @response(204, {
    description: 'Bureau PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() bureau: Bureau,
  ): Promise<void> {
    await this.bureauRepository.replaceById(id, bureau);
  }

  @del('/bureaux/{id}')
  @response(204, {
    description: 'Bureau DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bureauRepository.deleteById(id);
  }
}

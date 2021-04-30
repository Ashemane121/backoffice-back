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
import {UtiBureau} from '../models';
import {UtiBureauRepository} from '../repositories';

@authenticate('jwt')
export class UtibureauController {
  constructor(
    @repository(UtiBureauRepository)
    public utiBureauRepository: UtiBureauRepository,
  ) { }

  @post('/uti-bureaux')
  @response(200, {
    description: 'UtiBureau model instance',
    content: {'application/json': {schema: getModelSchemaRef(UtiBureau)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UtiBureau, {
            title: 'NewUtiBureau',
            exclude: ['id'],
          }),
        },
      },
    })
    utiBureau: Omit<UtiBureau, 'id'>,
  ): Promise<UtiBureau> {
    return this.utiBureauRepository.create(utiBureau);
  }

  @get('/uti-bureaux/count')
  @response(200, {
    description: 'UtiBureau model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UtiBureau) where?: Where<UtiBureau>,
  ): Promise<Count> {
    return this.utiBureauRepository.count(where);
  }

  @get('/uti-bureaux')
  @response(200, {
    description: 'Array of UtiBureau model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UtiBureau, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UtiBureau) filter?: Filter<UtiBureau>,
  ): Promise<UtiBureau[]> {
    return this.utiBureauRepository.find(filter);
  }

  @patch('/uti-bureaux')
  @response(200, {
    description: 'UtiBureau PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UtiBureau, {partial: true}),
        },
      },
    })
    utiBureau: UtiBureau,
    @param.where(UtiBureau) where?: Where<UtiBureau>,
  ): Promise<Count> {
    return this.utiBureauRepository.updateAll(utiBureau, where);
  }

  @get('/uti-bureaux/{id}')
  @response(200, {
    description: 'UtiBureau model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UtiBureau, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UtiBureau, {exclude: 'where'}) filter?: FilterExcludingWhere<UtiBureau>
  ): Promise<UtiBureau> {
    return this.utiBureauRepository.findById(id, filter);
  }

  @patch('/uti-bureaux/{id}')
  @response(204, {
    description: 'UtiBureau PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UtiBureau, {partial: true}),
        },
      },
    })
    utiBureau: UtiBureau,
  ): Promise<void> {
    await this.utiBureauRepository.updateById(id, utiBureau);
  }

  @put('/uti-bureaux/{id}')
  @response(204, {
    description: 'UtiBureau PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() utiBureau: UtiBureau,
  ): Promise<void> {
    await this.utiBureauRepository.replaceById(id, utiBureau);
  }

  @del('/uti-bureaux/{id}')
  @response(204, {
    description: 'UtiBureau DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.utiBureauRepository.deleteById(id);
  }
}

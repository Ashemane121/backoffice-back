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
import {Association} from '../models';
import {AssociationRepository} from '../repositories';

@authenticate('jwt')
export class AssociationController {
  constructor(
    @repository(AssociationRepository)
    public associationRepository: AssociationRepository,
  ) { }

  @post('/associations')
  @response(200, {
    description: 'Association model instance',
    content: {'application/json': {schema: getModelSchemaRef(Association)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Association, {
            title: 'NewAssociation',
            exclude: ['id'],
          }),
        },
      },
    })
    association: Omit<Association, 'id'>,
  ): Promise<Association> {
    return this.associationRepository.create(association);
  }

  @get('/associations/count')
  @response(200, {
    description: 'Association model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Association) where?: Where<Association>,
  ): Promise<Count> {
    return this.associationRepository.count(where);
  }

  @get('/associations')
  @response(200, {
    description: 'Array of Association model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Association, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Association) filter?: Filter<Association>,
  ): Promise<Association[]> {
    return this.associationRepository.find(filter);
  }

  @patch('/associations')
  @response(200, {
    description: 'Association PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Association, {partial: true}),
        },
      },
    })
    association: Association,
    @param.where(Association) where?: Where<Association>,
  ): Promise<Count> {
    return this.associationRepository.updateAll(association, where);
  }

  @get('/associations/{id}')
  @response(200, {
    description: 'Association model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Association, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Association, {exclude: 'where'}) filter?: FilterExcludingWhere<Association>
  ): Promise<Association> {
    return this.associationRepository.findById(id, filter);
  }

  @patch('/associations/{id}')
  @response(204, {
    description: 'Association PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Association, {partial: true}),
        },
      },
    })
    association: Association,
  ): Promise<void> {
    await this.associationRepository.updateById(id, association);
  }

  @put('/associations/{id}')
  @response(204, {
    description: 'Association PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() association: Association,
  ): Promise<void> {
    await this.associationRepository.replaceById(id, association);
  }

  @del('/associations/{id}')
  @response(204, {
    description: 'Association DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.associationRepository.deleteById(id);
  }
}

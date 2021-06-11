import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Bureau,
Stat,
Association,
} from '../models';
import {BureauRepository} from '../repositories';

export class BureauAssociationController {
  constructor(
    @repository(BureauRepository) protected bureauRepository: BureauRepository,
  ) { }

  @get('/bureaus/{id}/associations', {
    responses: {
      '200': {
        description: 'Array of Bureau has many Association through Stat',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Association)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Association>,
  ): Promise<Association[]> {
    return this.bureauRepository.associations(id).find(filter);
  }

  @post('/bureaus/{id}/associations', {
    responses: {
      '200': {
        description: 'create a Association model instance',
        content: {'application/json': {schema: getModelSchemaRef(Association)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Bureau.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Association, {
            title: 'NewAssociationInBureau',
            exclude: ['id'],
          }),
        },
      },
    }) association: Omit<Association, 'id'>,
  ): Promise<Association> {
    return this.bureauRepository.associations(id).create(association);
  }

  @patch('/bureaus/{id}/associations', {
    responses: {
      '200': {
        description: 'Bureau.Association PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Association, {partial: true}),
        },
      },
    })
    association: Partial<Association>,
    @param.query.object('where', getWhereSchemaFor(Association)) where?: Where<Association>,
  ): Promise<Count> {
    return this.bureauRepository.associations(id).patch(association, where);
  }

  @del('/bureaus/{id}/associations', {
    responses: {
      '200': {
        description: 'Bureau.Association DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Association)) where?: Where<Association>,
  ): Promise<Count> {
    return this.bureauRepository.associations(id).delete(where);
  }
}

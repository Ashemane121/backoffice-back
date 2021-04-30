import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Bureau,
  Ligcaibur
} from '../models';
import {BureauRepository} from '../repositories';

@authenticate('jwt')
export class BureauLigcaiburController {
  constructor(
    @repository(BureauRepository) protected bureauRepository: BureauRepository,
  ) { }

  @get('/bureaux/ligcaiburs/{id}', {
    responses: {
      '200': {
        description: 'Array of Bureau has many Ligcaibur',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ligcaibur)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ligcaibur>,
  ): Promise<Ligcaibur[]> {
    return this.bureauRepository.ligcaiburs(id).find(filter);
  }

  @post('/bureaux/ligcaiburs/{id}', {
    responses: {
      '200': {
        description: 'Bureau model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ligcaibur)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Bureau.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ligcaibur, {
            title: 'NewLigcaiburInBureau',
            exclude: ['id'],
            optional: ['bureauId']
          }),
        },
      },
    }) ligcaibur: Omit<Ligcaibur, 'id'>,
  ): Promise<Ligcaibur> {
    return this.bureauRepository.ligcaiburs(id).create(ligcaibur);
  }

  @patch('/bureaux/ligcaiburs/{id}', {
    responses: {
      '200': {
        description: 'Bureau.Ligcaibur PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ligcaibur, {partial: true}),
        },
      },
    })
    ligcaibur: Partial<Ligcaibur>,
    @param.query.object('where', getWhereSchemaFor(Ligcaibur)) where?: Where<Ligcaibur>,
  ): Promise<Count> {
    return this.bureauRepository.ligcaiburs(id).patch(ligcaibur, where);
  }

  @del('/bureaux/ligcaiburs/{id}', {
    responses: {
      '200': {
        description: 'Bureau.Ligcaibur DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ligcaibur)) where?: Where<Ligcaibur>,
  ): Promise<Count> {
    return this.bureauRepository.ligcaiburs(id).delete(where);
  }
}

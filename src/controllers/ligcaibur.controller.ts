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
import {Ligcaibur} from '../models';
import {LigcaiburRepository} from '../repositories';

@authenticate('jwt')
export class LigcaiburController {
  constructor(
    @repository(LigcaiburRepository)
    public ligcaiburRepository: LigcaiburRepository,
  ) { }

  @post('/ligcaiburs')
  @response(200, {
    description: 'Ligcaibur model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ligcaibur)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ligcaibur, {
            title: 'NewLigcaibur',
            exclude: ['id'],
          }),
        },
      },
    })
    ligcaibur: Omit<Ligcaibur, 'id'>,
  ): Promise<Ligcaibur> {
    return this.ligcaiburRepository.create(ligcaibur);
  }

  @get('/ligcaiburs/count')
  @response(200, {
    description: 'Ligcaibur model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ligcaibur) where?: Where<Ligcaibur>,
  ): Promise<Count> {
    return this.ligcaiburRepository.count(where);
  }

  @get('/ligcaiburs')
  @response(200, {
    description: 'Array of Ligcaibur model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ligcaibur, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ligcaibur) filter?: Filter<Ligcaibur>,
  ): Promise<Ligcaibur[]> {
    return this.ligcaiburRepository.find(filter);
  }

  @patch('/ligcaiburs')
  @response(200, {
    description: 'Ligcaibur PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ligcaibur, {partial: true}),
        },
      },
    })
    ligcaibur: Ligcaibur,
    @param.where(Ligcaibur) where?: Where<Ligcaibur>,
  ): Promise<Count> {
    return this.ligcaiburRepository.updateAll(ligcaibur, where);
  }

  @get('/ligcaiburs/{id}')
  @response(200, {
    description: 'Ligcaibur model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ligcaibur, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Ligcaibur, {exclude: 'where'}) filter?: FilterExcludingWhere<Ligcaibur>
  ): Promise<Ligcaibur> {
    return this.ligcaiburRepository.findById(id, filter);
  }

  @patch('/ligcaiburs/{id}')
  @response(204, {
    description: 'Ligcaibur PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ligcaibur, {partial: true}),
        },
      },
    })
    ligcaibur: Ligcaibur,
  ): Promise<void> {
    await this.ligcaiburRepository.updateById(id, ligcaibur);
  }

  @put('/ligcaiburs/{id}')
  @response(204, {
    description: 'Ligcaibur PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ligcaibur: Ligcaibur,
  ): Promise<void> {
    await this.ligcaiburRepository.replaceById(id, ligcaibur);
  }

  @del('/ligcaiburs/{id}')
  @response(204, {
    description: 'Ligcaibur DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ligcaiburRepository.deleteById(id);
  }
}

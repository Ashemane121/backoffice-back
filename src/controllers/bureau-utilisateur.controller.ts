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

  Utilisateur
} from '../models';
import {BureauRepository} from '../repositories';

@authenticate('jwt')
export class BureauUtilisateurController {
  constructor(
    @repository(BureauRepository) protected bureauRepository: BureauRepository,
  ) { }

  @get('/bureaux/utilisateurs/{id}', {
    responses: {
      '200': {
        description: 'Array of Bureau has many Utilisateur through UtiBureau',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Utilisateur)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Utilisateur>,
  ): Promise<Utilisateur[]> {
    return this.bureauRepository.utilisateurs(id).find(filter);
  }

  @post('/bureaux/utilisateurs/{id}', {
    responses: {
      '200': {
        description: 'create a Utilisateur model instance',
        content: {'application/json': {schema: getModelSchemaRef(Utilisateur)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Bureau.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Utilisateur, {
            title: 'NewUtilisateurInBureau',
            exclude: ['id'],
          }),
        },
      },
    }) utilisateur: Omit<Utilisateur, 'id'>,
  ): Promise<Utilisateur> {
    return this.bureauRepository.utilisateurs(id).create(utilisateur);
  }

  @patch('/bureaux/utilisateurs/{id}', {
    responses: {
      '200': {
        description: 'Bureau.Utilisateur PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Utilisateur, {partial: true}),
        },
      },
    })
    utilisateur: Partial<Utilisateur>,
    @param.query.object('where', getWhereSchemaFor(Utilisateur)) where?: Where<Utilisateur>,
  ): Promise<Count> {
    return this.bureauRepository.utilisateurs(id).patch(utilisateur, where);
  }

  @del('/bureaux/utilisateurs/{id}', {
    responses: {
      '200': {
        description: 'Bureau.Utilisateur DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Utilisateur)) where?: Where<Utilisateur>,
  ): Promise<Count> {
    return this.bureauRepository.utilisateurs(id).delete(where);
  }
}

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
  Caisse, Utilisateur
} from '../models';
import {UtilisateurRepository} from '../repositories';

@authenticate('jwt')
export class UtilisateurCaisseController {
  constructor(
    @repository(UtilisateurRepository) protected utilisateurRepository: UtilisateurRepository,
  ) { }

  @get('/utilisateurs/caisse/{id}', {
    responses: {
      '200': {
        description: 'Utilisateur has one Caisse',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Caisse),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Caisse>,
  ): Promise<Caisse> {
    return this.utilisateurRepository.caisse(id).get(filter);
  }

  @post('/utilisateurs/caisse/{id}', {
    responses: {
      '200': {
        description: 'Utilisateur model instance',
        content: {'application/json': {schema: getModelSchemaRef(Caisse)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Utilisateur.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Caisse, {
            title: 'NewCaisseInUtilisateur',
            exclude: ['id'],
            optional: ['utilisateurId']
          }),
        },
      },
    }) caisse: Omit<Caisse, 'id'>,
  ): Promise<Caisse> {
    return this.utilisateurRepository.caisse(id).create(caisse);
  }

  @patch('/utilisateurs/caisse/{id}', {
    responses: {
      '200': {
        description: 'Utilisateur.Caisse PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Caisse, {partial: true}),
        },
      },
    })
    caisse: Partial<Caisse>,
    @param.query.object('where', getWhereSchemaFor(Caisse)) where?: Where<Caisse>,
  ): Promise<Count> {
    return this.utilisateurRepository.caisse(id).patch(caisse, where);
  }

  @del('/utilisateurs/caisse/{id}', {
    responses: {
      '200': {
        description: 'Utilisateur.Caisse DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Caisse)) where?: Where<Caisse>,
  ): Promise<Count> {
    return this.utilisateurRepository.caisse(id).delete(where);
  }
}

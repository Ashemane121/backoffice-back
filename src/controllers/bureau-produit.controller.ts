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

  Produit
} from '../models';
import {BureauRepository} from '../repositories';

@authenticate('jwt')
export class BureauProduitController {
  constructor(
    @repository(BureauRepository) protected bureauRepository: BureauRepository,
  ) { }

  @get('/bureaux/produits/{id}', {
    responses: {
      '200': {
        description: 'Array of Bureau has many Produit through Association',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Produit)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Produit>,
  ): Promise<Produit[]> {
    return this.bureauRepository.produits(id).find(filter);
  }

  @post('/bureaux/produits/{id}', {
    responses: {
      '200': {
        description: 'create a Produit model instance',
        content: {'application/json': {schema: getModelSchemaRef(Produit)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Bureau.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Produit, {
            title: 'NewProduitInBureau',
            exclude: ['id'],
          }),
        },
      },
    }) produit: Omit<Produit, 'id'>,
  ): Promise<Produit> {
    return this.bureauRepository.produits(id).create(produit);
  }

  @patch('/bureaux/produits/{id}', {
    responses: {
      '200': {
        description: 'Bureau.Produit PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Produit, {partial: true}),
        },
      },
    })
    produit: Partial<Produit>,
    @param.query.object('where', getWhereSchemaFor(Produit)) where?: Where<Produit>,
  ): Promise<Count> {
    return this.bureauRepository.produits(id).patch(produit, where);
  }

  @del('/bureaux/produits/{id}', {
    responses: {
      '200': {
        description: 'Bureau.Produit DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Produit)) where?: Where<Produit>,
  ): Promise<Count> {
    return this.bureauRepository.produits(id).delete(where);
  }
}

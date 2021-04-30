import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyThroughRepositoryFactory, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Association, Bureau, BureauRelations, Produit, UtiBureau, Utilisateur, Ligcaibur} from '../models';
import {AssociationRepository} from './association.repository';
import {ProduitRepository} from './produit.repository';
import {UtiBureauRepository} from './uti-bureau.repository';
import {UtilisateurRepository} from './utilisateur.repository';
import {LigcaiburRepository} from './ligcaibur.repository';

export class BureauRepository extends DefaultCrudRepository<
  Bureau,
  typeof Bureau.prototype.id,
  BureauRelations
> {

  public readonly produits: HasManyThroughRepositoryFactory<Produit, typeof Produit.prototype.id,
    Association,
    typeof Bureau.prototype.id
  >;

  public readonly utilisateurs: HasManyThroughRepositoryFactory<Utilisateur, typeof Utilisateur.prototype.id,
    UtiBureau,
    typeof Bureau.prototype.id
  >;

  public readonly ligcaiburs: HasManyRepositoryFactory<Ligcaibur, typeof Bureau.prototype.id>;

  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource, @repository.getter('AssociationRepository') protected associationRepositoryGetter: Getter<AssociationRepository>, @repository.getter('ProduitRepository') protected produitRepositoryGetter: Getter<ProduitRepository>, @repository.getter('UtiBureauRepository') protected utiBureauRepositoryGetter: Getter<UtiBureauRepository>, @repository.getter('UtilisateurRepository') protected utilisateurRepositoryGetter: Getter<UtilisateurRepository>, @repository.getter('LigcaiburRepository') protected ligcaiburRepositoryGetter: Getter<LigcaiburRepository>,
  ) {
    super(Bureau, dataSource);
    this.ligcaiburs = this.createHasManyRepositoryFactoryFor('ligcaiburs', ligcaiburRepositoryGetter,);
    this.registerInclusionResolver('ligcaiburs', this.ligcaiburs.inclusionResolver);
    this.utilisateurs = this.createHasManyThroughRepositoryFactoryFor('utilisateurs', utilisateurRepositoryGetter, utiBureauRepositoryGetter,);
    this.registerInclusionResolver('utilisateurs', this.utilisateurs.inclusionResolver);
    this.produits = this.createHasManyThroughRepositoryFactoryFor('produits', produitRepositoryGetter, associationRepositoryGetter,);
    this.registerInclusionResolver('produits', this.produits.inclusionResolver);
  }
}

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Utilisateur, UtilisateurRelations, Caisse} from '../models';
import {CaisseRepository} from './caisse.repository';

export class UtilisateurRepository extends DefaultCrudRepository<
  Utilisateur,
  typeof Utilisateur.prototype.id,
  UtilisateurRelations
> {

  public readonly caisse: HasOneRepositoryFactory<Caisse, typeof Utilisateur.prototype.id>;

  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource, @repository.getter('CaisseRepository') protected caisseRepositoryGetter: Getter<CaisseRepository>,
  ) {
    super(Utilisateur, dataSource);
    this.caisse = this.createHasOneRepositoryFactoryFor('caisse', caisseRepositoryGetter);
    this.registerInclusionResolver('caisse', this.caisse.inclusionResolver);
  }
}

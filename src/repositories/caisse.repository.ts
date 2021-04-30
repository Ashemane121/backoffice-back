import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Caisse, CaisseRelations, LigneCaisse} from '../models';
import {LigneCaisseRepository} from './ligne-caisse.repository';

export class CaisseRepository extends DefaultCrudRepository<
  Caisse,
  typeof Caisse.prototype.id,
  CaisseRelations
> {

  public readonly ligneCaisses: HasManyRepositoryFactory<LigneCaisse, typeof Caisse.prototype.id>;

  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource, @repository.getter('LigneCaisseRepository') protected ligneCaisseRepositoryGetter: Getter<LigneCaisseRepository>,
  ) {
    super(Caisse, dataSource);
    this.ligneCaisses = this.createHasManyRepositoryFactoryFor('ligneCaisses', ligneCaisseRepositoryGetter,);
    this.registerInclusionResolver('ligneCaisses', this.ligneCaisses.inclusionResolver);
  }
}

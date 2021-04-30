import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Banque, BanqueRelations, Agence} from '../models';
import {AgenceRepository} from './agence.repository';

export class BanqueRepository extends DefaultCrudRepository<
  Banque,
  typeof Banque.prototype.id,
  BanqueRelations
> {

  public readonly agences: HasManyRepositoryFactory<Agence, typeof Banque.prototype.id>;

  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource, @repository.getter('AgenceRepository') protected agenceRepositoryGetter: Getter<AgenceRepository>,
  ) {
    super(Banque, dataSource);
    this.agences = this.createHasManyRepositoryFactoryFor('agences', agenceRepositoryGetter,);
    this.registerInclusionResolver('agences', this.agences.inclusionResolver);
  }
}

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Devise, DeviseRelations, Coupure} from '../models';
import {CoupureRepository} from './coupure.repository';

export class DeviseRepository extends DefaultCrudRepository<
  Devise,
  typeof Devise.prototype.id,
  DeviseRelations
> {

  public readonly coupures: HasManyRepositoryFactory<Coupure, typeof Devise.prototype.id>;

  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource, @repository.getter('CoupureRepository') protected coupureRepositoryGetter: Getter<CoupureRepository>,
  ) {
    super(Devise, dataSource);
    this.coupures = this.createHasManyRepositoryFactoryFor('coupures', coupureRepositoryGetter,);
    this.registerInclusionResolver('coupures', this.coupures.inclusionResolver);
  }
}

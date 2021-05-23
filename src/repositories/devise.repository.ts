import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Devise, DeviseRelations, Coupure, Ligcaibur} from '../models';
import {CoupureRepository} from './coupure.repository';
import {LigcaiburRepository} from './ligcaibur.repository';

export class DeviseRepository extends DefaultCrudRepository<
  Devise,
  typeof Devise.prototype.id,
  DeviseRelations
> {

  public readonly coupures: HasManyRepositoryFactory<Coupure, typeof Devise.prototype.id>;

  public readonly ligcaiburs: HasManyRepositoryFactory<Ligcaibur, typeof Devise.prototype.id>;

  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource, @repository.getter('CoupureRepository') protected coupureRepositoryGetter: Getter<CoupureRepository>, @repository.getter('LigcaiburRepository') protected ligcaiburRepositoryGetter: Getter<LigcaiburRepository>,
  ) {
    super(Devise, dataSource);
    this.ligcaiburs = this.createHasManyRepositoryFactoryFor('ligcaiburs', ligcaiburRepositoryGetter,);
    this.registerInclusionResolver('ligcaiburs', this.ligcaiburs.inclusionResolver);
    this.coupures = this.createHasManyRepositoryFactoryFor('coupures', coupureRepositoryGetter,);
    this.registerInclusionResolver('coupures', this.coupures.inclusionResolver);
  }
}

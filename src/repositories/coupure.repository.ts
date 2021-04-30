import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Coupure, CoupureRelations} from '../models';

export class CoupureRepository extends DefaultCrudRepository<
  Coupure,
  typeof Coupure.prototype.id,
  CoupureRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Coupure, dataSource);
  }
}

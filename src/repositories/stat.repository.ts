import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Stat, StatRelations} from '../models';

export class StatRepository extends DefaultCrudRepository<
  Stat,
  typeof Stat.prototype.id,
  StatRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Stat, dataSource);
  }
}

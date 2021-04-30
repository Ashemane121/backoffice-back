import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Pays, PaysRelations} from '../models';

export class PaysRepository extends DefaultCrudRepository<
  Pays,
  typeof Pays.prototype.id,
  PaysRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Pays, dataSource);
  }
}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {UtiBureau, UtiBureauRelations} from '../models';

export class UtiBureauRepository extends DefaultCrudRepository<
  UtiBureau,
  typeof UtiBureau.prototype.id,
  UtiBureauRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(UtiBureau, dataSource);
  }
}

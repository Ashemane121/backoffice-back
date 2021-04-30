import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Ligcaibur, LigcaiburRelations} from '../models';

export class LigcaiburRepository extends DefaultCrudRepository<
  Ligcaibur,
  typeof Ligcaibur.prototype.id,
  LigcaiburRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Ligcaibur, dataSource);
  }
}

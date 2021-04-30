import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Agence, AgenceRelations} from '../models';

export class AgenceRepository extends DefaultCrudRepository<
  Agence,
  typeof Agence.prototype.id,
  AgenceRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Agence, dataSource);
  }
}

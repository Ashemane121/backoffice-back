import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Association, AssociationRelations} from '../models';

export class AssociationRepository extends DefaultCrudRepository<
  Association,
  typeof Association.prototype.id,
  AssociationRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Association, dataSource);
  }
}

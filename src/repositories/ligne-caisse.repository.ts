import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {LigneCaisse, LigneCaisseRelations} from '../models';

export class LigneCaisseRepository extends DefaultCrudRepository<
  LigneCaisse,
  typeof LigneCaisse.prototype.id,
  LigneCaisseRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(LigneCaisse, dataSource);
  }
}

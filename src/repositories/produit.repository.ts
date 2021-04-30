import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Produit, ProduitRelations} from '../models';

export class ProduitRepository extends DefaultCrudRepository<
  Produit,
  typeof Produit.prototype.id,
  ProduitRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(Produit, dataSource);
  }
}

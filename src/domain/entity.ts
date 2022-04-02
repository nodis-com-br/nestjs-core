import { EntityProperties } from './entity-properties'
import { ObjectId } from './object-id'

export abstract class Entity<TId = ObjectId> implements EntityProperties<TId> {
  protected constructor(public id: TId) {}
}

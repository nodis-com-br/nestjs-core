import { ObjectId } from './object-id'

export interface EntityProperties<TId = ObjectId> {
  id: TId
}

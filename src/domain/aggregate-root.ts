import { Entity } from './entity'
import { ObjectId } from './object-id'
import { Event } from './event'

export abstract class AggregateRoot<TId = ObjectId> extends Entity<TId> {
  deletadoEm: Date

  private newEvents: Event[]

  constructor(id: TId) {
    super(id)
    this.deletadoEm = null
    this.newEvents = []
  }

  clearChanges(): void {
    this.newEvents = []
  }

  protected raise(event: Event): void {
    this.addEvent(event)
  }

  get changes(): Event[] {
    return this.newEvents
  }

  protected delete<EventType extends Event>(deletionEvent: EventType): void {
    this.addEvent(deletionEvent)
    this.deletadoEm = new Date()
  }

  private addEvent(event: Event): void {
    this.newEvents.push(event)
  }
}

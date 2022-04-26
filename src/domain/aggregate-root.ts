import { Entity } from './entity'
import { Event } from './event'
import { ObjectId } from './object-id'

export abstract class AggregateRoot<TId = ObjectId> extends Entity<TId> {
  criadoEm: Date
  atualizadoEm: Date | null
  deletadoEm: Date | null

  private newEvents: Event[]

  constructor(id: TId) {
    super(id)
    this.criadoEm = new Date()
    this.atualizadoEm = null
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

  public delete<EventType extends Event>(deletionEvent: EventType): void {
    this.addEvent(deletionEvent)
    this.deletadoEm = new Date()
  }

  public update<EventType extends Event>(updateEvent: EventType | null): void {
    if (updateEvent !== null) this.addEvent(updateEvent)
    this.atualizadoEm = new Date()
  }

  private addEvent(event: Event): void {
    this.newEvents.push(event)
  }
}

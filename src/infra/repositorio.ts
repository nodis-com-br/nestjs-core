import { EventEmitter2 } from '@nestjs/event-emitter'
import { AggregateRoot } from '../domain/aggregate-root'
import { ObjectId } from '../domain/object-id'

export abstract class Repositorio<AggregateRootType extends AggregateRoot> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Type: new (id: string) => AggregateRootType

  constructor(
    private readonly eventEmitter: EventEmitter2,
    type: new (id: string) => AggregateRootType,
  ) {
    this.Type = type
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  factory<T>(GenericRowType: new (...parameters) => T, ...parameters): T {
    return new GenericRowType(...parameters)
  }

  protected async publishChanges(root: AggregateRootType): Promise<void> {
    const publishPromises = root.changes.map(async (event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error newEvents
      const { newEvents, ...clonedEvent } = event
      return await this.eventEmitter.emitAsync(event.name, clonedEvent)
    })

    await Promise.all(publishPromises)

    root.clearChanges()
  }

  protected toAggregateRoot(model: any): AggregateRootType | null {
    if (!model) return null

    return Object.assign(new this.Type(model.id), model, {})
  }

  protected toModel(aggregateRoot: AggregateRootType): any {
    if (!aggregateRoot) return null

    return Object.assign({}, aggregateRoot, { newEvents: undefined, id: undefined })
  }

  abstract buscarPorId(id: ObjectId): Promise<AggregateRootType>
  abstract excluirPorId(id: ObjectId): Promise<boolean>
  abstract adicionar(aggregateRoot: AggregateRootType): Promise<boolean>
  abstract atualizar(aggregateRoot: AggregateRootType): Promise<boolean>
}

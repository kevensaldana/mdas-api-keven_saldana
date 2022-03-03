import FavoritePokemonAddedEvent from '../../domain/events/FavoritePokemonAddedEvent'
import { DomainEventClass } from '../../domain/DomainEvent'
import { DomainEventNotFoundException } from '../../../../contexts/shared/domain/DomainEventNotFoundException'

type DomainEventMap = Map<string, DomainEventClass>

export class DomainEventMapping {
  private mapping: DomainEventMap

  constructor() {
    this.mapping = new Map([[FavoritePokemonAddedEvent.EVENT_NAME, FavoritePokemonAddedEvent]])
  }

  for(name: string) {
    const domainEvent = this.mapping.get(name)

    if (!domainEvent) {
      throw new DomainEventNotFoundException(name)
    }

    return domainEvent
  }
}

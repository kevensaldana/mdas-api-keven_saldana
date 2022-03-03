import DomainEvent from './DomainEvent'
import DomainEventSubscriber from './DomainEventSubscriber'

export interface EventBusConfigSubscriber {
  key: string
  subscriber: DomainEventSubscriber
}

export default interface EventBus {
  publish(events: Array<DomainEvent>): void
  start(list: EventBusConfigSubscriber[]): void
}

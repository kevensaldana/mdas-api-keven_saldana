import DomainEvent from './DomainEvent'

export default interface DomainEventSubscriber {
  consume(event: DomainEvent): void
}

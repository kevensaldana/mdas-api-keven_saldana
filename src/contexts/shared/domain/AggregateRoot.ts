import DomainEvent from './DomainEvent'

export default abstract class AggregateRoot {
  private recordedDomainEvents: Array<DomainEvent> = []

  public pullDomainEvents(): Array<DomainEvent> {
    const recordedDomainEvents = [...this.recordedDomainEvents]
    this.recordedDomainEvents = []

    return recordedDomainEvents
  }

  protected record(event: DomainEvent) {
    this.recordedDomainEvents.push(event)
  }
}

import Uuid from './Uuid'

export default abstract class DomainEvent {
  static EVENT_NAME = ''
  readonly _eventId: string
  readonly _occurredOn: string
  readonly _aggregateId: string
  readonly _eventName: string

  constructor(eventName: string, aggregateId: string, eventId?: string, occurredOn?: string) {
    this._eventName = eventName
    this._aggregateId = aggregateId
    this._eventId = eventId || Uuid.random().value
    this._occurredOn = occurredOn || new Date().toUTCString()
  }

  static fromPrimitives: (
    aggregateId: string,
    body: { [key: string]: any },
    eventId: string,
    occurredOn: string
  ) => DomainEvent

  abstract toPrimitives(): { [key: string]: any }

  get eventName() {
    return this._eventName
  }

  get aggregateId() {
    return this._aggregateId
  }

  get eventId() {
    return this._eventId
  }

  get occurredOn() {
    return this._occurredOn
  }
}

export type DomainEventClass = {
  EVENT_NAME: string
  fromPrimitives(aggregateId: string, body: { [key: string]: any }, eventId: string, occurredOn: string): DomainEvent
}

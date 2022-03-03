import PubSub from 'pubsub-js'
import EventBus, { EventBusConfigSubscriber } from '../../../domain/EventBus'
import DomainEvent from '../../../domain/DomainEvent'
import { DomainEventNotConsumedException } from '../../../domain/DomainEventNotConsumedException'
import { DomainEventNotSentException } from '../../../../../contexts/shared/domain/DomainEventNotSentException'

export default class InMemorySyncEventBus implements EventBus {
  publish(events: Array<DomainEvent>) {
    events.forEach((event) => {
      try {
        PubSub.publishSync(event.eventName, event)
      } catch (ex) {
        throw new DomainEventNotSentException(JSON.stringify(event))
      }
    })
  }

  start(list: EventBusConfigSubscriber[]) {
    list.forEach((config) => {
      PubSub.subscribe(config.key, (_, data: any) => {
        try {
          config.subscriber.consume(data)
        } catch (error) {
          throw new DomainEventNotConsumedException(JSON.stringify(data))
        }
      })
    })
  }

  clear() {
    PubSub.clearAllSubscriptions()
  }
}

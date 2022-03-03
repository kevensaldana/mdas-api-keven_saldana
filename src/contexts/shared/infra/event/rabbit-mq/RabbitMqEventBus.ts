import { Connection, Message, Exchange } from 'amqp-ts'
import RabbitMqConfig from './RabbitMqConfig'
import Logger from '../../../../../contexts/shared/domain/Logger'
import { EventBusConfigSubscriber } from '../../../../../contexts/shared/domain/EventBus'
import { DomainEventJsonDeserializer } from '../DomainEventJsonDeserializer'
import EventBus from '../../../domain/EventBus'
import DomainEvent from '../../../domain/DomainEvent'
import { DomainEventNotSentException } from '../../../../../contexts/shared/domain/DomainEventNotSentException'
import { DomainEventNotConsumedException } from '../../../domain/DomainEventNotConsumedException'
import { DomainEventNotFoundException } from '../../../../../contexts/shared/domain/DomainEventNotFoundException'

interface RabbitMqConsumerConfig extends EventBusConfigSubscriber {
  queue: string
}

export default class RabbitMqEventbus implements EventBus {
  private connection: Connection
  private exchange: Exchange
  private logger: Logger
  private deserializer: DomainEventJsonDeserializer

  constructor(config: RabbitMqConfig, logger: Logger, deserializer: DomainEventJsonDeserializer) {
    this.logger = logger
    this.connection = new Connection(`amqp://${config.user}:${config.password}@${config.host}`)
    this.exchange = this.connection.declareExchange(config.exchange, 'topic')
    this.deserializer = deserializer
  }

  publish(events: Array<DomainEvent>) {
    let message: Message
    events.forEach((event) => {
      try {
        message = new Message(
          {
            data: {
              id: event.eventId,
              type: event.eventName,
              occurred_on: event.occurredOn,
              attributes: {
                ...event.toPrimitives(),
                id: event.aggregateId
              }
            },
            meta: {}
          },
          {
            messageId: event.eventId,
            contentType: 'application/json',
            contentEncoding: 'utf-8'
          }
        )
        this.logger.info(`[RabbitMqEventBus] Event to be published: ${event.eventName} ${event.eventId}`)
        this.exchange.send(message, event.eventName)
      } catch (ex) {
        throw new DomainEventNotSentException(message.content.toString())
      }
    })
  }

  async start(list: RabbitMqConsumerConfig[]) {
    let messageContent: string

    list.forEach(async (item) => {
      const queue = this.connection.declareQueue(item.queue)
      queue.bind(this.exchange, item.key)

      await queue.activateConsumer(async (message) => {
        try {
          messageContent = message.content.toString()
          const event = this.deserializer.deserialize(messageContent)
          item.subscriber.consume(event)
          this.logger.info(`[RabbitMqEventBus] Event consumed: ${event.eventName} ${event.eventId}`)

          message.ack()
        } catch (error) {
          if (error instanceof DomainEventNotFoundException) {
            this.logger.error(`[RabbitMqEventBus] ${error.message}`)
          }
          throw new DomainEventNotConsumedException(messageContent)
        }
      })
    })
  }
}

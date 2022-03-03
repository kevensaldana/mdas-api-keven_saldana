import RabbitMqConfig from './RabbitMqConfig'

export class RabbitMqConfigFactory {
  static createConfig(): RabbitMqConfig {
    const { RABBITMQ_HOST, RABBITMQ_DEFAULT_USER, RABBITMQ_DEFAULT_PASS, RABBITMQ_EXCHANGE } = process.env

    return {
      host: RABBITMQ_HOST || '',
      user: RABBITMQ_DEFAULT_USER || '',
      password: RABBITMQ_DEFAULT_PASS || '',
      exchange: RABBITMQ_EXCHANGE || ''
    }
  }
}

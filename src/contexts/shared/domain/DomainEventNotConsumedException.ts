export class DomainEventNotConsumedException extends Error {
  constructor(value: string) {
    super(`The domain event ${value} could not be consumed`)
  }
}

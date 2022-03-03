export class DomainEventNotFoundException extends Error {
  constructor(value: string) {
    super(`The domain event ${value} doesn't exist`)
  }
}

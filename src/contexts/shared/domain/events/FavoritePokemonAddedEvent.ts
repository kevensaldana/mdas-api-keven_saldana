import DomainEvent from '../DomainEvent'

export default class FavoritePokemonAddedEvent extends DomainEvent {
  static EVENT_NAME = 'favorite_pokemon.added'

  constructor(aggregateId: string, private pokemonId: number, eventId?: string, occurredOn?: string) {
    super(FavoritePokemonAddedEvent.EVENT_NAME, aggregateId, eventId, occurredOn)
  }

  static fromPrimitives(aggregateId: string, body: { [key: string]: any }, eventId: string, occurredOn: string) {
    return new FavoritePokemonAddedEvent(aggregateId, body.pokemonId, eventId, occurredOn)
  }

  getPokemonId() {
    return this.pokemonId
  }

  toPrimitives(): { [key: string]: any } {
    return {
      pokemonId: this.pokemonId
    }
  }
}

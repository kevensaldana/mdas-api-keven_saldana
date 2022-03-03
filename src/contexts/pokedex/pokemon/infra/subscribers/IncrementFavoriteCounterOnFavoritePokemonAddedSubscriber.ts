import FavoritePokemonAddedEvent from '../../../../shared/domain/events/FavoritePokemonAddedEvent'
import DomainEventSubscriber from '../../../../shared/domain/DomainEventSubscriber'
import IncrementPokemonFavoriteCounterById from '../../application/IncrementPokemonFavoriteCounterById'

export default class IncrementFavoriteCounterOnFavoritePokemonAddedSubscriber implements DomainEventSubscriber {
  private incrementPokemonFavorite: IncrementPokemonFavoriteCounterById

  constructor(incrementPokemonFavoriteCounterById: IncrementPokemonFavoriteCounterById) {
    this.incrementPokemonFavorite = incrementPokemonFavoriteCounterById
  }

  consume(event: FavoritePokemonAddedEvent) {
    this.incrementPokemonFavorite.execute(event.getPokemonId())
  }
}

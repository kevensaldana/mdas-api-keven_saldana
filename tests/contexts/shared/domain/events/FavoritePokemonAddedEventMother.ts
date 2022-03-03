import FavoritePokemonAddedEvent from '../../../../../src/contexts/shared/domain/events/FavoritePokemonAddedEvent'
import { User } from '../../../../../src/contexts/users/domain/User'

export default class FavoritePokemonAddedEventMother {
  static create(aggregateId: string, pokemonId: number) {
    return new FavoritePokemonAddedEvent(aggregateId, pokemonId)
  }

  static fromUser(user: User, pokemonId: number) {
    return FavoritePokemonAddedEventMother.create(user.getId().value, pokemonId)
  }
}

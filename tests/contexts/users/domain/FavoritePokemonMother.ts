import { FavoritePokemon } from '../../../../src/contexts/users/domain/FavoritePokemon'
import { PokemonId } from '../../../../src/contexts/users/domain/PokemonId'
import PokemonIdMother from './PokemonIdMother'

export default class FavoritePokemonMother {
  static create(value: number) {
    return new FavoritePokemon(new PokemonId(value))
  }

  static random() {
    return new FavoritePokemon(PokemonIdMother.random())
  }
}

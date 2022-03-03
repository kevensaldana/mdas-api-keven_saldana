import Pokemon from './Pokemon'
import PokemonRepository from './PokemonRepository'

export default class PokemonFavoriteCounterIncrementer {
  private repository: PokemonRepository

  constructor(repository: PokemonRepository) {
    this.repository = repository
  }

  execute(pokemon: Pokemon) {
    pokemon.incrementFavoriteCounter()
    this.repository.save(pokemon)
  }
}

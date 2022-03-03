import Id from '../domain/Id'
import PokemonFavoriteCounterIncrementer from '../domain/PokemonFavoriteCounterIncrementer'
import PokemonFinder from '../domain/PokemonFinder'

export default class IncrementPokemonFavoriteCounterById {
  private pokemonFavoriteCounterIncrementer: PokemonFavoriteCounterIncrementer
  private pokemonFinder: PokemonFinder

  constructor(pokemonFavoriteCounterIncrementer: PokemonFavoriteCounterIncrementer, pokemonFinder: PokemonFinder) {
    this.pokemonFavoriteCounterIncrementer = pokemonFavoriteCounterIncrementer
    this.pokemonFinder = pokemonFinder
  }

  async execute(id: number) {
    const pokemon = await this.pokemonFinder.execute(new Id(id))
    this.pokemonFavoriteCounterIncrementer.execute(pokemon)
  }
}

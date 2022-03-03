import Pokemon from './Pokemon'
import Id from './Id'

export default interface PokemonRepository {
  find: (pokemonId: Id) => Promise<Pokemon | null>
  exists: (pokemonId: Id) => Promise<boolean>
  save: (pokemon: Pokemon) => void
}

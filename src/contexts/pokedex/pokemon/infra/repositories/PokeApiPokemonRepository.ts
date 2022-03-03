import axios, { AxiosError } from 'axios'
import Pokemon from '../../domain/Pokemon'
import Height from '../../domain/Height'
import Id from '../../domain/Id'
import Name from '../../domain/Name'
import PokemonRepository from '../../domain/PokemonRepository'
import { PokemonRepositoryNotWorkingException } from '../../domain/PokemonRepositoryNotWorkingException'
import Weight from '../../domain/Weight'

export default class PokeApiPokemonRepository implements PokemonRepository {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
  private mapCachePokemon = new Map<number, Pokemon>()

  async find(id: Id) {
    const cachePokemon = this.mapCachePokemon.get(id.value)
    if (cachePokemon) {
      return cachePokemon
    }
    try {
      const response = await axios.get(`${this.baseUrl}${id.value}`)
      const {
        data: { id: pokemonId, name, weight, height }
      } = response

      return Pokemon.create(new Id(pokemonId), new Name(name), new Height(height), new Weight(weight))
    } catch (ex) {
      const error = (ex as AxiosError).response
      if (error && error.status === 404) {
        return null
      }
      throw new PokemonRepositoryNotWorkingException()
    }
  }

  async exists(id: Id) {
    return (await this.find(id)) !== null
  }

  save(pokemon: Pokemon) {
    this.mapCachePokemon.set(pokemon.getId().value, pokemon)
  }
}

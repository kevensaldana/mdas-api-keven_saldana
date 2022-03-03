import { FavoritePokemon } from '../domain/FavoritePokemon'
import { FavoritePokemonCreator } from '../domain/FavoritePokemonCreator'
import { PokemonId } from '../domain/PokemonId'
import UserFinder from '../domain/UserFinder'
import UserId from '../domain/UserId'

export class AddFavoritePokemonToUser {
  private userFinder: UserFinder
  private favoritePokemonCreator: FavoritePokemonCreator

  constructor(userFinder: UserFinder, favoritePokemonCreator: FavoritePokemonCreator) {
    this.userFinder = userFinder
    this.favoritePokemonCreator = favoritePokemonCreator
  }

  async execute(userId: string, pokemonId: number) {
    const user = await this.userFinder.execute(new UserId(userId))
    await this.favoritePokemonCreator.execute(user, new FavoritePokemon(new PokemonId(pokemonId)))
    console.log('AddFavoritePokemonToUser', JSON.stringify(user.getFavoritePokemons()))
  }
}

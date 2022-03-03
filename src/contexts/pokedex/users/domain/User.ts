import { FavoritePokemon } from './FavoritePokemon'
import { FavoritePokemons } from './FavoritePokemons'
import UserId from './UserId'
import UserName from './UserName'

export class User {
  private userId: UserId
  private userName: UserName
  private favoritePokemons: FavoritePokemons

  private constructor(userId: UserId, userName: UserName) {
    this.userId = userId
    this.userName = userName
    this.favoritePokemons = new FavoritePokemons()
  }

  static create(userId: UserId, userName: UserName) {
    return new User(userId, userName)
  }

  getId() {
    return this.userId
  }

  getName() {
    return this.userName
  }

  addFavoritePokemon(favoritePokemon: FavoritePokemon) {
    this.favoritePokemons.add(favoritePokemon)
  }

  getFavoritePokemons() {
    return this.favoritePokemons
  }

  setFavoritePokemons(favoritePokemons: FavoritePokemons) {
    this.favoritePokemons = favoritePokemons
  }
}

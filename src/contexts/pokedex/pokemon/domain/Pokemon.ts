import FavoriteCounter from './FavoriteCounter'
import Height from './Height'
import Id from './Id'
import Name from './Name'
import Weight from './Weight'

export default class Pokemon {
  private id: Id
  private name: Name
  private height: Height
  private weight: Weight
  private favoriteCounterTotal: FavoriteCounter

  constructor(id: Id, name: Name, height: Height, weight: Weight, favoriteCounter: FavoriteCounter) {
    this.id = id
    this.name = name
    this.height = height
    this.weight = weight
    this.favoriteCounterTotal = favoriteCounter
  }

  static create(id: Id, name: Name, height: Height, weight: Weight) {
    return new Pokemon(id, name, height, weight, new FavoriteCounter(0))
  }

  getId() {
    return this.id
  }

  incrementFavoriteCounter() {
    this.favoriteCounterTotal.increment()
  }
}

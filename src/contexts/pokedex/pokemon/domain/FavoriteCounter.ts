import NumberValueObject from '../../../shared/domain/NumberValueObject'

export default class FavoriteCounter extends NumberValueObject {
  increment() {
    this.value = this.value + 1
  }
}

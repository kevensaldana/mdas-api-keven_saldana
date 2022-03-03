import FavoriteCounterMother from './FavoriteCounterMother'

describe('FavoriteCounter', () => {
  it('should increment counter', async () => {
    // Arrange
    const favoriteCounter = FavoriteCounterMother.random()
    const favoriteCounterOriginal = favoriteCounter.value

    // Act
    favoriteCounter.increment()

    // Assert
    expect(favoriteCounter.value).toEqual(favoriteCounterOriginal + 1)
  })
})

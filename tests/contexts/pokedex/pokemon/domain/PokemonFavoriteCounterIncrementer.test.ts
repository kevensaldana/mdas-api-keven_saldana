import PokemonFavoriteCounterIncrementer from '../../../../../src/contexts/pokedex/pokemon/domain/PokemonFavoriteCounterIncrementer'
import PokemonMother from './PokemonMother'

describe('PokemonFavoriteCounterIncrementer', () => {
  it('should increment pokemon favorite counter', async () => {
    // Arrange
    const pokemon = PokemonMother.random()
    const saveSpy = jest.fn()
    const pokemonRepository = jest.fn().mockImplementation(() => ({
      save: saveSpy
    }))

    const pokemonFinder = new PokemonFavoriteCounterIncrementer(pokemonRepository())

    // Act
    await pokemonFinder.execute(pokemon)

    // Assert
    expect(saveSpy).toHaveBeenCalledWith(pokemon)
  })
})

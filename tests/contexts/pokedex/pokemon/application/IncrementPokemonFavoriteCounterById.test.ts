import IncrementPokemonFavoriteCounterById from '../../../../../src/contexts/pokedex/pokemon/application/IncrementPokemonFavoriteCounterById'
import PokemonMother from '../domain/PokemonMother'

describe('IncrementPokemonFavoriteCounterById', () => {
  it('should increment favorite pokemon counter given an id', async () => {
    // Arrange
    const pokemon = PokemonMother.random()
    const pokemonFinder = jest.fn().mockImplementation(() => ({
      execute: () => Promise.resolve(pokemon)
    }))
    const incrementerSpy = jest.fn()
    const serviceIncrementer = jest.fn().mockImplementation(() => ({
      execute: incrementerSpy
    }))

    const incrementer = new IncrementPokemonFavoriteCounterById(serviceIncrementer(), pokemonFinder())

    // Act
    await incrementer.execute(pokemon.getId().value)

    // Assert
    expect(incrementerSpy).toHaveBeenCalledWith(pokemon)
  })
})

import request from 'supertest'
import { App } from '../../../src/apps/api/App'
import container from '../../../src/apps/api/DependencyContainer'
import InMemorySyncEventBus from '../../../src/contexts/shared/infra/event/memory/InMemorySyncEventBus'
import FavoritePokemonAddedEvent from '../../../src/contexts/shared/domain/events/FavoritePokemonAddedEvent'
import FavoritePokemonAddedEventMother from '../../contexts/shared/domain/events/FavoritePokemonAddedEventMother'
import UserMother from '../../contexts/users/domain/UserMother'

let eventBus: InMemorySyncEventBus
let application: App

describe('Pokemon', () => {
  beforeAll(async () => {
    eventBus = container.get('Shared.EventBus')
    const configs = [
      {
        key: FavoritePokemonAddedEvent.EVENT_NAME,
        subscriber: container.get('Apps.Pokemon.subscriber.IncrementFavoriteCounterOnFavoritePokemonAdded')
      }
    ]
    eventBus.start(configs)
    application = new App()
    await application.start()
  })

  describe('Scenario: Find a Pokemon', () => {
    describe('Given I have "1" as argument', () => {
      describe('When I send a request to Api', () => {
        it('Then I get a Pokemon', async () => {
          await request(application.express)
            .get('/pokemon/1')
            .set('Accept', 'application/json')
            .expect(200)
            .then((response) => {
              expect(response.body).toEqual({
                pokemon: {
                  id: 1,
                  name: 'Bulbasaur',
                  height: 7,
                  weight: 69,
                  favoriteCounterTotal: 0
                }
              })
            })
        })
      })
    })
  })

  describe('Scenario: Find a Pokemon that does not exists', () => {
    describe('Given I have "1" as argument', () => {
      describe('When I send a request to Api', () => {
        it('Then I get an error message', async () => {
          await request(application.express)
            .get('/pokemon/2')
            .set('Accept', 'application/json')
            .expect(404)
            .then((response) => {
              expect(response.body.message).toBe('Pokemon 2 does not exists')
            })
        })
      })
    })
  })

  describe('Scenario: Increment pokemon favorite counter', () => {
    describe('Given I send an event to the event bus with a valid user id', () => {
      describe('When I send a "GET" request to GetPokemonById', () => {
        it('Then I get an incremented favorite counter', async () => {
          const user = UserMother.random()
          const pokemonId = 1
          const event = FavoritePokemonAddedEventMother.fromUser(user, pokemonId)

          eventBus.publish([event])

          await request(application.express)
            .get('/pokemon/' + pokemonId)
            .set('Accept', 'application/json')
            .then((response) => {
              expect(response.body.pokemon.favoriteCounterTotal).toBe(1)
            })
        })
      })
    })
  })

  afterAll(() => {
    eventBus.clear()
  })
})

import FavoritePokemonAddedEvent from '../../contexts/shared/domain/events/FavoritePokemonAddedEvent'
import EventBus from '../../contexts/shared/domain/EventBus'
import container from './DependencyContainer'
import { Server } from './Server'

export class App {
  server?: Server
  private env = process.env.NODE_ENV || 'dev'

  async start() {
    const port = process.env.PORT || '5001'
    this.server = new Server(port)
    if (this.env !== 'test') {
      this.listenDomainEvents()
    }
    return this.server.listen()
  }

  async stop() {
    return this.server?.stop()
  }

  get httpServer() {
    return this.server?.getHTTPServer()
  }

  get express() {
    return this.server?.getExpress()
  }

  private listenDomainEvents() {
    const eventBus = container.get('Shared.EventBus') as EventBus

    /*
      Nomenclature Queue:
      %servicio%.%entidad%.%accion%_on_$evento%
      user.notification.notify_user_on_video_published
    */

    const configSubscribers = [
      {
        queue: 'pokedex.pokemon.increment_favorite_counter_on_favorite_pokemon_added',
        key: FavoritePokemonAddedEvent.EVENT_NAME,
        subscriber: container.get('Apps.Pokemon.subscriber.IncrementFavoriteCounterOnFavoritePokemonAdded')
      }
    ]
    eventBus.start(configSubscribers)
  }
}

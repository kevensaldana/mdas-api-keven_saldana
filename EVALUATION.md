## Hace todos los puntos pedidos (40%)

#### El nombre del repositorio es el correcto (mdas-web-${nombre}_${apellido})

OK

#### Permite obtener los detalles de un pokemon vía endpoint (datos + número de veces que se ha marcado como favorito)

OK

#### Actualiza el contador de favoritos vía eventos

OK

#### ¿Se controlan las excepciones de dominio? Y si se lanza una excepción desde el dominio, ¿se traduce en infraestructura a un código HTTP?

OK

#### Tests unitarios

- No se está testeando el servicio de dominio `PokemonFavoriteCounterIncrementer`

#### Tests de aceptación

OK

#### Tests de integración

OK

**Puntuación: 35/40**

## Se aplican conceptos explicados (50%)

#### Separación correcta de capas (application, domain, infrastructure + BC/module/layer)

OK

#### Aggregates + VOs

OK

#### No se trabajan con tipos primitivos en dominio

OK

#### Hay servicios de dominio

- OK, aunque el servicio de dominio `PokemonFavoriteCounterIncrementer` podría tener dentro el servicio `PokemonFinder`
  y así el application service quedar más simple.

#### Hay use cases en aplicación reutilizables

OK

#### Se aplica el patrón repositorio

OK

#### Se usan subscribers

OK

#### Se lanzan eventos de dominio

OK

#### Se utilizan object mothers

OK

**Puntuación: 47/50**

## Facilidad setup + README (10%)

#### El README contiene al menos los apartados "cómo ejecutar la aplicación", "cómo usar la aplicación"

OK

#### Es sencillo seguir el apartado "cómo ejecutar la aplicación"

OK

**Puntuación: 10/10**

**PUNTUACIÓN FINAL: 92/100**

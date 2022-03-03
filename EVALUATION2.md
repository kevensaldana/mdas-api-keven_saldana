## Hace todos los puntos pedidos (40%)

#### Permite crear usuarios vía endpoint

OK

#### Permite añadir favoritos vía endpoint

- OK, aunque no permite añadir favoritos por el ID que conocemos o por el nombre, sino que se necesita tener un uuid
  válido.

#### Si el pokemon ya está marcado como favorito, ¿se lanza una excepción de dominio?

OK

#### Si el usuario no existe, ¿se lanza una excepción de dominio?

OK

#### Si se lanza una excepción desde el dominio, ¿se traduce en infraestructura a un código HTTP?

- OK aunque no todas las excepciones están mapeadas:

```
500 - Error: Internal Server Error

{
  "message": "Uuid does not allow the value 1"
}
```

```
500 - Error: Internal Server Error

{
  "message": "User 9816a938-0e23-4125-83c0-9db597f8fbb1 does not exist"
}
```

#### Hay tests unitarios

OK

**Puntuación: 37/40**

## Se aplican conceptos explicados (50%)

#### Separación correcta de capas (application, domain, infrastructure + BC/module/layer)

OK

#### Aggregates + VOs

OK

#### No se trabajan con tipos primitivos en dominio

OK

#### Hay servicios de dominio

- Los servicios de dominio deberían manejar el agregado, no las entidades o VOs de este. Es decir, necesitaríais
  un `UserFinder`, y que este os devuelva el agregado `User` y sobre este, hacer un `User.addFavourite()`. Es más, el
  método `addFavoritePokemon` no se está usando cuando el aggregate root debería ser el único responsable de gestionar
  sus entidades.

#### Hay use cases en aplicación reutilizables

OK

#### Se aplica el patrón repositorio

OK

#### Se utilizan object mothers

OK

**Puntuación: 32/50**

## Facilidad setup + README (10%)

#### El README contiene al menos los apartados "cómo ejecutar la aplicación", "cómo user la aplicación"

OK

#### Es sencillo seguir el apartado "cómo ejecutar la aplicación"

OK

**Puntuación: 10/10**

## Observaciones

**PUNTUACIÓN FINAL: 79/100**

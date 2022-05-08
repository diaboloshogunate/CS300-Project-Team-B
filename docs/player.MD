# Player

## Instantiate

Player is an object that can be instantiated. The constructor takes its starting params.

| param            | type   | example value      | description                               |
|------------------|--------|--------------------|-------------------------------------------|
| startingPosition | Vector | `new Vector(2, 3)` | starting board position                   |
| startingEnergy   | int    | `1000`             | Amount of energy the player starts with   |
| supplies         | int    | `100`              | Amount of supplies the player starts with |
| mapSize          | int    | `128`              | Size of the map.                          |

```js
let player = new Player(startingPosition, startingEnergy, startingSupplies, mapSize)
```

## Parameters

### Position

The position is a Vector representing the x, y position on the game grid.

Get

```js
let currentPosition = player.position

let currentX = currentPosition.x
let currenty = currentPosition.y
// or
let currentX = player.position.x
let currenty = player.position.y
```

Set

```js
player.position = new Vector(0, 50)
// or
player.position.x = 0
player.position.y = 50
```

### Energy

The energy is an int representing the players current energy

Get

```js
let currentEnergy = player.energy
```

Set

```js
player.energy = 20
```

### Supplies

The supplies are an int representing the players current energy

Get

```js
let currentSupplies = player.supplies
```

Set

```js
player.supllies = 50
```

### Supplies

The supplies are an int representing the players current energy

Get

```js
let currentSupplies = player.supplies
```

Set

```js
player.supllies = 50
```

### Supplies

The supplies are an int representing the players current energy

Get

```js
let currentSupplies = player.supplies
```

Set

```js
player.supllies = 50
```

### Map Size

The map size is an int representing the players current energy

Get

```js
let currentPlayerMapSize = player.mapSize
```

Set

```js
player.mapSize = 256
```

## Methods

### Move

move will move the player to a new cell. 
It takes the direction in radians and a magnitude (polar coordinate).

It will be rounded to the nearest cell at the end of the calculation.

If it goes of the map it will call `activateWormhole` which will teleport the player to a new location

It will automatically deduct the supplies and energy for the move

```js
player.move(90.0 * (Math.PI / 180.0), 3)
```

### Activate Wormhole

Activate a wormhole and teleport to a new position.

The energy is automatically deducted

```js
player.activateWormhole()
```
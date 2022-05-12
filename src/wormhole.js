class Wormhole extends Cell {
    onPlayerCollision(player) {
        if(!player instanceof Player)
            throw `onPlayerCollision requires the player is passed in as an argument`

        let newPosition = this.#getNewPosition(player.map.length)
        while(!this.#isValidNewPosition(player, newPosition))
            newPosition = this.#getNewPosition(player.map.length)

        player.energy -= 10
        player.position = newPosition
    }

    #getNewPosition(maxPosition) {
        return new Vector(Math.floor(Math.random() * maxPosition) + 1, Math.floor(Math.random() * maxPosition) + 1)
    }

    #isValidNewPosition(player, newPosition) {
        return newPosition.x !== player.position.x || newPosition.x !== player.position.y
    }
}
class Wormhole extends Cell {
    backgroundColor = `#521ecd`

    get name () {
        return `Wormhole`
    }

    onPlayerCollision(player) {
        if(!player instanceof Player)
            throw `onPlayerCollision requires the player is passed in as an argument`

        let newPosition = this.#getNewPosition(player.map.size)
        while(!this.#isValidNewPosition(player, newPosition))
            newPosition = this.#getNewPosition(player.map.size)

        player.energy -= 10
        player.position = newPosition
    }

    #getNewPosition(maxPosition) {
        return new Vector(Math.floor(Math.random() * maxPosition), Math.floor(Math.random() * maxPosition))
    }

    #isValidNewPosition(player, newPosition) {
        return newPosition.x !== player.position.x || newPosition.x !== player.position.y
    }
}
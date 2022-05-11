class Cell {
    #position

    constructor(position) {
        this.position = position
    }

    get position() {
        return this.#position
    }

    onPlayerCollision(player) {
        if(!player instanceof Player)
            throw `onPlayerCollision requires the player is passed in as an argument`
    }
}

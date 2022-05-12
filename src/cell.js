class Cell {
    #isHidden = true

    get isHidden () {
        return this.#isHidden
    }

    set isHidden (value) {
        this.#isHidden = value
    }

    onPlayerCollision(player) {
        if(!player instanceof Player)
            throw `onPlayerCollision requires the player is passed in as an argument`
    }
}

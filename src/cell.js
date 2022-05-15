class Cell {
    isHidden = true
    backgroundColor = `#000`

    /**
     * check if the cell is hidden from the map
     * @returns {boolean}
     */
    get isHidden () {
        return this.isHidden
    }

    /**
     * set if the cell should be hidden from the map
     * @param value
     */
    set isHidden (value) {
        this.isHidden = value
    }

    // todo
    playerChoices(player) {
        // return array of string actions and the callable they will run if the player choose it?
    }

    /**
     * hand player collision
     * @param {Player} player
     */
    onPlayerCollision(player) {
        if(!player instanceof Player)
            throw `onPlayerCollision requires the player is passed in as an argument`
    }
}

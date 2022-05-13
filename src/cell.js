class Cell {
    isHidden = true

    get isHidden () {
        return this.isHidden
    }

    set isHidden (value) {
        this.isHidden = value
    }

    get backgroundColor() {
        return `#000`
    }

    playerChoices(player) {
        // return array of string actions and the callable they will run if the player choose it?
    }

    onPlayerCollision(player) {
        if(!player instanceof Player)
            throw `onPlayerCollision requires the player is passed in as an argument`
    }
}

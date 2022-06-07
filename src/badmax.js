class BadMax extends Cell {
    backgroundColor = `#860000`

    get name () {
        return `Bad Max`
    }

    onPlayerCollision(player) {
        super.onPlayerCollision(player);
        let roll  = Math.random()

        // we fight them off
        roll -= 0.5
        if(roll <= 0) {
            return
        }

        // they blow us up
        roll -= 0.2
        if(roll <= 0) {
            // blow up player
            return
        }

        // they rob us
        roll -= 0.3
        if(roll <= 0) {
            player.credits = 0
            player.supplies = 0.5 * player.supplies
            return
        }

        throw `Unexpected result. Perhaps a bad rng was generated?`
    }
}
class AbandonedFreighter extends Cell {
    backgroundColor = `#1f421f`

    #supplies
    #energy

    get supplies() {
        return this.#supplies
    }

    get energy() {
        return this.#energy
    }

    get name () {
        return `Abandoned Freighter`
    }

    onPlayerCollision(player) {
        super.onPlayerCollision(player);
        // transfer supplies and energy to player
    }
}
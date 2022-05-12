class AbandonedFreighter extends Cell {
    #supplies
    #energy

    get supplies() {
        return this.#supplies
    }

    get energy() {
        return this.#energy
    }

    onPlayerCollision(player) {
        super.onPlayerCollision(player);
        // transfer supplies and energy to player
    }
}
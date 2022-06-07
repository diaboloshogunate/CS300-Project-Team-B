class AbandonedFreighter extends Cell {
    backgroundColor = `#1f421f`

    #supplies
    #energy

    get supplies() {
        return this.#supplies
    }

    set supplies(value) {
        validateSafeInt(value)
        this.#supplies = value
    }

    get energy() {
        return this.#energy
    }

    set energy(value) {
        validateSafeInt(value)
        this.#energy = value
    }

    get name () {
        return `Abandoned Freighter`
    }

    transferEnergyAndSupplies(player) {
        const playerEnergy = player.energy
        const playerSupplies = player.supplies

        player.energy = player.energy + this.energy
        player.supplies += this.supplies

        const playerEnergyDiff = player.energy - playerEnergy
        const playerSuppliesDiff = player.supplies - playerSupplies

        this.energy -= playerEnergyDiff
        this.supplies -= playerSuppliesDiff
    }

    onPlayerCollision(player) {
        super.onPlayerCollision(player);
    }
}
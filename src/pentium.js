class Pentium extends Planet {
    backgroundColor = `#5ac5f3`
    isHidden = false
    #recipe
    #number

    // TODO random position
    constructor(position, number, hasRecipe) {
        super(position);
        this.#number = number || 0
        this.#recipe = hasRecipe || false
    }

    get name () {
        return `Pentium-${this.#number}`
    }

    get number () {
        return this.#number
    }

    get hasRecipe () {
        return this.#recipe
    }

    takeRecipe() {
        this.#recipe = false
    }

    /**
     * hand player collision
     * @param {Player} player
     */
    onPlayerCollision(player) {
        if(!player instanceof Player)
            throw `onPlayerCollision requires the player is passed in as an argument`
        console.log('Collided with pentium')
        this.eventManager.trigger(Event.playerMessage,  `Collision with Pentium ${this.#number}`)
    }
}
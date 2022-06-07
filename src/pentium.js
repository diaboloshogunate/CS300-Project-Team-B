class Pentium extends Planet {
    backgroundColor = `#5ac5f3`
    isHidden = true
    hasRecipe
    number

    /**
     * @param {number} number number of planet
     * @param {boolean} hasRecipe if the planet has a recipe
     */
    constructor(number, hasRecipe) {
        super();
        this.number = number || 0
        this.hasRecipe = !!hasRecipe
    }

    /**
     * planets name
     * @returns {string}
     */
    get name () {
        return `Pentium ${this.number}`
    }

    /**
     * give the recipe to a player
     * @param player the player to give the recipe to
     */
    takeRecipe(player) {
        this.hasRecipe   = false
        player.hasRecipe = true
    }

    /**
     * hand player collision
     * @param {Player} player
     */
    onPlayerCollision(player) {
        if(!player instanceof Player)
            throw `onPlayerCollision requires the player is passed in as an argument`
        console.log('Collided with pentium')
        this.eventManager.trigger(Event.playerMessage,  `Collision with Pentium ${this.number}`)
    }
}
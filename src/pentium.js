class Pentium extends Planet {
    #recipe
    #number

    // TODO random position
    constructor(position, number, hasRecipe) {
        super(position);
        this.#number = number || 0
        this.#recipe = hasRecipe || false
    }

    get backgroundColor() {
        return `#5ac5f3`
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
}
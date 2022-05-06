class Player {
    #position
    #energy
    #supplies

    constructor(position, energy, supplies) {
        this.#position = position || new Vector(0,0)
        this.#energy   = energy || 1000
        this.#supplies = supplies || 100
    }

    get position() {
        return this.#position
    }

    set position(value) {
        if(!value instanceof Vector)
            throw `Invalid position. Position must be an instance of value. Provided ${value.name}`

        this.#position = value
    }

    get energy() {
        return this.#energy
    }

    set energy(value) {
        if(!Number.isSafeInteger(value))
            throw `Invalid energy. Must be a safe integer. Provided ${value}`

        this.#energy = value
    }

    get supplies() {
        return this.#supplies
    }

    set supplies(value) {
        if(!Number.isSafeInteger(value) || value < 0 || value > 100)
            throw `Invalid supplies. Must be a safe integer between 0-100 (inclusive). Provided ${value}`

        this.#supplies = value
    }

    move(direction, magnitude) {
        this.#validateDirection(direction)
        this.#validateMagnitude(magnitude)

        let movement = this.#polarToCoordinate(direction, magnitude)

        this.position = new Vector(this.position.x + movement.x, this.position.y + movement.y)
        this.supplies = this.supplies - 2
        this.energy = this.energy - 10 * magnitude
    }

    #polarToCoordinate(direction, magnitude) {
        return new Vector(magnitude * Math.cos(direction), magnitude * Math.sin(direction))
    }

    #validateDirection(direction) {
        let allowedDirections = [0, 90, 180, 270];

        if(!allowedDirections.includes(direction))
            throw `Invalid direction. Allowed values are ${allowedDirections.join(', ')}. Provided ${coordinate}`
    }

    #validateMagnitude(magnitude)
    {
        if(!Number.isSafeInteger(magnitude))
            throw `Invalid magnitude. Must be a safe integer. Provided ${magnitude}`
    }
}

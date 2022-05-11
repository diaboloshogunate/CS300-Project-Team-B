class Player {
    #position
    #energy
    #supplies
    #mapSize

    constructor(position, energy, supplies, mapSize) {
        this.#position = position || new Vector(0,0)
        this.#energy   = energy || 1000
        this.#supplies = supplies || 100
        this.#mapSize = mapSize || 127
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

    get mapSize() {
        return this.#mapSize
    }

    set mapSize(value) {
        if(!Number.isSafeInteger(value) || value < 0 || value > 100)
            throw `Invalid boxBoundsLength. Must be a safe integer between 0-100 (inclusive). Provided ${value}`

        this.#mapSize = value
    }

    move(direction, magnitude) {
        this.#validateDirection(direction)
        this.#validateMagnitude(magnitude)

        let movement = this.#polarToCoordinate(direction, magnitude)
        let nextPosition = new Vector(this.position.x + movement.x, this.position.y + movement.y)

        if( nextPosition.x <= 0 || nextPosition.x > this.mapSize || nextPosition.y <= 0 || nextPosition.y > this.mapSize)
            return this.activateWormhole()

        this.position = nextPosition
        this.supplies = this.supplies - 2
        this.energy = this.energy - 10 * magnitude
    }

    activateWormhole() {
        this.position.x = Math.floor(Math.random() * this.mapSize) + 1;
        this.position.y = Math.floor(Math.random() * this.mapSize) + 1;
        this.energy = this.energy - 10
    }

    #polarToCoordinate(direction, magnitude) {
        return new Vector(Math.round(magnitude * Math.cos(direction)), Math.round(magnitude * Math.sin(direction)))
    }

    #validateDirection(direction) {
        let parsedDirection = parseFloat(direction)

        if(isNaN(parsedDirection))
            throw `Invalid magnitude. Must be a valid float. Provided ${direction}`
    }

    #validateMagnitude(magnitude)
    {
        if(!Number.isSafeInteger(magnitude))
            throw `Invalid magnitude. Must be a safe integer. Provided ${magnitude}`
    }
}

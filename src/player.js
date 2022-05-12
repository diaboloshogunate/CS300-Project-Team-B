class Player {
    #position
    #energy
    #supplies
    #credits
    #map

    constructor(position, energy, supplies, credits, map) {
        this.#position = position || new Vector(0,0)
        this.#energy   = energy || 1000
        this.#supplies = supplies || 100
        this.#credits = credits || 1000
        this.map = map
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

    get credits() {
        return this.#credits
    }

    set credits(value) {
        if(!Number.isSafeInteger(value) || value < 0 || value > 100)
            throw `Invalid credits. Must be a safe integer between 0-100 (inclusive). Provided ${value}`

        this.#credits = value
    }

    get map() {
        return this.#map
    }

    set map(value) {
        if(!value instanceof Map)
            throw `Invalid type. Expected Map. Giver ${value.name}`

        this.#map = value
    }

    move(direction, magnitude) {
        this.#validateDirection(direction)
        this.#validateMagnitude(magnitude)

        // move one unit at a time so collisions can trigger
        // base each step on the starting unit and increment magnitude by 1
        // this ensures that you hit up to n cells where n is the magnitude
        const startingPosition = this.position
        for(let distanceTraveled = 1; distanceTraveled <= magnitude; distanceTraveled++) {
            let movement = polarToCoordinate(direction, distanceTraveled)
            this.position = new Vector(startingPosition.x + movement.x, startingPosition.y + movement.y)
            this.energy -= 10
            this.#map.revealPosition(this.position)
            this.#map.triggerPlayerCollision(this)
        }

        this.supplies = this.supplies - 2
    }

    scan(position, distance) {
        const startX = clamp(position.x - distance, 0, this.map.size - 1)
        const endX   = clamp(position.x + distance, 0, this.map.size - 1)
        const startY = clamp(position.y - distance, 0, this.map.size - 1)
        const endY   = clamp(position.y + distance, 0, this.map.size - 1)

        for(let i = startX; i <= endX; i++) {
            for(let j = startY; j <= endY; j++) {
                this.#map.revealPosition(new Vector(i, j))
            }
        }
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

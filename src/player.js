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

    set map(value) {
        if(!value instanceof Map)
            throw `Invalid type. Expected Map. Giver ${value.name}`

        this.#map = value
    }

    move(direction, magnitude) {
        this.#validateDirection(direction)
        this.#validateMagnitude(magnitude)

        let movement = polarToCoordinate(direction, magnitude)
        let nextPosition = new Vector(this.position.x + movement.x, this.position.y + movement.y)

        if( nextPosition.x <= 0 || nextPosition.x > this.map.size || nextPosition.y <= 0 || nextPosition.y > this.map.size)
            return this.activateWormhole()

        this.position = nextPosition
        this.supplies = this.supplies - 2
        this.energy = this.energy - 10 * magnitude
    }

    activateWormhole() {
        this.position.x = Math.floor(Math.random() * this.map.size) + 1;
        this.position.y = Math.floor(Math.random() * this.map.size) + 1;
        this.energy = this.energy - 10
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

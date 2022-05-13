class Player {
    #position
    #energy
    #energyCapacity
    #supplies
    #credits
    #map

    constructor(position, energy, energyCapacity, supplies, credits, map) {
        this.#position       = position || new Vector(0,0)
        this.#energy         = energy || 1000
        this.#energyCapacity = energyCapacity || 1000
        this.#supplies       = supplies || 100
        this.#credits        = credits || 1000
        this.map             = map
    }

    get position() {
        return this.#position
    }

    set position(value) {
        if(!value instanceof Vector)
            throw `Invalid position. Position must be an instance of value. Provided ${value.name}`

        this.#position = value
        this.#map.revealPosition(this.position)
        this.#map.triggerPlayerCollision(this)
    }

    get energy() {
        return this.#energy
    }

    set energy(value) {
        if(!Number.isSafeInteger(value))
            throw `Invalid energy. Must be a safe integer. Provided ${value}`

        this.#energy = clamp(value, 0, this.energyCapacity)
    }

    get energyCapacity() {
        return this.#energyCapacity
    }

    set energyCapacity(value) {
        if(!Number.isSafeInteger(value))
            throw `Invalid energy. Must be a safe integer. Provided ${value}`

        this.#energyCapacity = value
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
            let nextPosition = new Vector(startingPosition.x + movement.x, startingPosition.y + movement.y)

            if(!this.#map.is(nextPosition)) {
                const wormhole = new Wormhole()
                wormhole.onPlayerCollision(this)
                break
            }

            this.position = nextPosition
            this.energy -= 10
        }

        this.supplies = this.supplies - 2
        this.#validateSupplies()
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

    #validateSupplies(){
        if(this.#supplies <= 0)
            throw `Ran out of supplies. You lose the game`
    }

    toString() {
        return`<table class="table table-sm table-hover table-borderless">
            <tbody>
                <tr>
                    <th>Credits</th>
                    <td>${this.credits}</td>
                </tr>
                <tr>
                    <th>Position</th>
                    <td>${this.position.x}, ${this.position.y}</td>
                </tr>
                <tr>
                    <th>Energy</th>
                    <td>
                        <div class="progress" style="height: 24px;">
                            <div class="progress-bar bg-success" role="progressbar" style="width: ${normalize(this.energy, this.energyCapacity)}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${this.energy}/${this.energyCapacity}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>Supplies</th>
                    <td>
                        <div class="progress" style="height: 24px;">
                            <div class="progress-bar bg-warning" role="progressbar" style="width: ${this.supplies}%;" aria-valuenow="${this.supplies}" aria-valuemin="0" aria-valuemax="100">${this.supplies}%</div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>`
    }
}

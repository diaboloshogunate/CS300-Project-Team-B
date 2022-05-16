/**
 * class for a player
 */
class Player {
    position
    energy
    energyCapacity
    supplies
    credits
    map

    /**
     * create a player
     * @param {Vector} position starting position
     * @param {number} energy starting amount of energy
     * @param {number} energyCapacity maximum amount of energy the player can have
     * @param {number} supplies starting amount of supplis
     * @param {number} credits starting amount of credits
     * @param {Cell[][]} map map
     */
    constructor(position, energy, energyCapacity, supplies, credits, map) {
        this.position       = position || new Vector(0,0)
        this.energy         = energy || 1000
        this.energyCapacity = energyCapacity || 1000
        this.supplies       = supplies || 100
        this.credits        = credits || 1000
        this.map             = map
        this.position
    }

    /**
     * get current position
     * @returns {Vector}
     */
    get position() {
        return this.position
    }

    /**
     * set current position, reveal it in map and trigger cell collision
     * position is clamped to the map size
     * @param value
     */
    set position(value) {
        validateType(value, Vector.name)
        value.x = clamp(0,1,this.map.size - 1)
        value.x = clamp(0,1,this.map.size - 1)

        this.position = value
        this.map.revealPosition(value)
        this.map.triggerPlayerCollision(this)
    }

    /**
     * get the current energy level
     * @returns {number}
     */
    get energy() {
        return this.energy
    }

    /**
     * get energy
     * @param {number} value
     */
    set energy(value) {
        validateSafeInt(value)

        this.energy = clamp(value, 0, this.energyCapacity)
    }

    /**
     * get energy capacity
     * @returns {number}
     */
    get energyCapacity() {
        return this.energyCapacity
    }

    /**
     * set current energy capacity
     * @param {number} value
     */
    set energyCapacity(value) {
        validateSafeInt(value)

        this.energyCapacity = value
    }

    /**
     * get supplies
     * @returns {number} supplies
     */
    get supplies() {
        return this.supplies
    }

    /**
     * set supplies
     * @param {number} value
     */
    set supplies(value) {
        validateSafeInt(value)
        value = clamp(value, 0, 100)

        this.supplies = value

        if(this.supplies === 0)
            throw `Ran out of supplies. You lose the game`
    }

    /**
     * get credits
     * @returns {number}
     */
    get credits() {
        return this.credits
    }

    /**
     * set credits
     * @param {number} value
     */
    set credits(value) {
        validateSafeInt(value)

        this.credits = value
    }

    /**
     * get map
     * @returns {Map}
     */
    get map() {
        return this.map
    }

    /**
     * sets the map
     * @param {Map} value
     */
    set map(value) {
        validateType(value, Map.name)

        this.map = value
    }

    /**
     * move the player in a direction for a given distance
     * player will move one unit at a time until it reaches the final point
     * @param {number} direction angle in rads such as Math.PI
     * @param {number} magnitude distance in units
     */
    move(direction, magnitude) {
        validateFloat(direction)
        validateSafeInt(magnitude)


        // move one unit at a time so collisions can trigger
        // base each step on the starting unit and increment magnitude by 1
        // this ensures that you hit up to n cells where n is the magnitude
        const startingPosition = this.position
        for(let distanceTraveled = 1; distanceTraveled <= magnitude; distanceTraveled++) {
            let movement = polarToCoordinate(direction, distanceTraveled)
            let nextPosition = new Vector(startingPosition.x + movement.x, startingPosition.y + movement.y)

            if(!this.map.is(nextPosition)) {
                const wormhole = new Wormhole()
                wormhole.onPlayerCollision(this)
                break
            }

            this.position = nextPosition
            this.energy -= 10
        }

        this.supplies = this.supplies - 2
        validateSupplies(this.supplies)
    }

    /**
     * scan the map and reveal points
     * @param {Vector} position position to center the scan at
     * @param {number} radius distance of the scan
     */
    scan(position, radius) {
        const startX = clamp(position.x - radius, 0, this.map.size - 1)
        const endX   = clamp(position.x + radius, 0, this.map.size - 1)
        const startY = clamp(position.y - radius, 0, this.map.size - 1)
        const endY   = clamp(position.y + radius, 0, this.map.size - 1)

        for(let i = startX; i <= endX; i++) {
            for(let j = startY; j <= endY; j++) {
                this.map.revealPosition(new Vector(i, j))
            }
        }
    }

    /**
     * get html representation of the player
     * @returns {string} table with player stats
     */
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

/**
 * class for a player
 */
class Player {
  #_state
  #_position;
  #_energy;
  #_energyCapacity;
  #_supplies;
  #_credits;
  #_map;
  #_eventManager;
  #_debug;
  #_hasRecipe;

  /**
   * create a player
   * @param {Vector} position starting position
   * @param {number} energy starting amount of energy
   * @param {number} energyCapacity maximum amount of energy the player can have
   * @param {number} supplies starting amount of supplis
   * @param {number} credits starting amount of credits
   * @param {Map} map map
   */
  constructor(position, energy, energyCapacity, supplies, credits, map) {
    this.energyCapacity = energyCapacity || 1000;
    this.energy = energy || 1000;
    this.supplies = supplies || 100;
    this.credits = credits || 1000;
    this.map = map;
    this.position = position || new Vector(0, 0);
    this.#_eventManager = new EventManager()
    this.#_eventManager.trigger(Event.playerMessage, `All Systems Ready`)
    this.#_state = PlayerState.Space
    this.#_hasRecipe = false
  }

  get state()
  {
    return this.#_state
  }

  set state(value)
  {
    validateType(value, PlayerState)
    this.#_state = value
  }

  get isAlive() {
    return this.state !== PlayerState.Dead
  }

  get hasRecipe() {
    return this.#_hasRecipe
  }

  set hasRecipe(value) {
    this.#_hasRecipe = !!value
  }

  /**
   * get current position
   * @returns {Vector}
   */
  get position() {
    return this.#_position;
  }

  /**
   * set current position, reveal it in map and trigger cell collision
   * position is clamped to the map size
   * @param value
   */
  set position(value) {
    validateType(value, Vector);
    value.x = clamp(value.x, 0, this.map.size - 1);
    value.y = clamp(value.y, 0, this.map.size - 1);

    this.#_position = value;
    this.map.revealPosition(value);
    this.map.triggerPlayerCollision(this);
  }

  /**
   * get the current energy level
   * @returns {number}
   */
  get energy() {
    return this.#_energy;
  }

  /**
   * get energy
   * @param {number} value
   */
  set energy(value) {
    validateSafeInt(value)

    this.#_energy = clamp(value, 0, this.energyCapacity)

    if(this.#_energy === 0) {
      player.state = PlayerState.Dead
      this.#_eventManager.trigger(Event.playerMessage, `You ran out of energy. You lose the game`)
      this.#_eventManager.trigger(Event.playerDeath, player)
    }
  }

  /**
   * get energy capacity
   * @returns {number}
   */
  get energyCapacity() {
    return this.#_energyCapacity;
  }

  /**
   * set current energy capacity
   * @param {number} value
   */
  set energyCapacity(value) {
    if(!this.isAlive) return;
    validateSafeInt(value);

    this.#_energyCapacity = value;
  }

  /**
   * get supplies
   * @returns {number} supplies
   */
  get supplies() {
    return this.#_supplies;
  }

  /**
   * set supplies
   * @param {number} value
   */
  set supplies(value) {
    if(!this.isAlive) return;
    validateSafeInt(value)
    value = clamp(value, 0, 100)

    this.#_supplies = value

    if (this.#_supplies === 0) {
      player.state = PlayerState.Dead
      this.#_eventManager.trigger(Event.playerMessage, `Ran out of supplies. You lose the game`)
      this.#_eventManager.trigger(Event.playerDeath, player)
    }
  }

  /**
   * get credits
   * @returns {number}
   */
  get credits() {
    return this.#_credits;
  }

  /**
   * set credits
   * @param {number} value
   */
  set credits(value) {
    if(!this.isAlive) return;
    validateSafeInt(value);

    this.#_credits = value;
  }

  /**
   * get map
   * @returns {Map}
   */
  get map() {
    return this.#_map;
  }

  /**
   * sets the map
   * @param {Map} value
   */
  set map(value) {
    if(!this.isAlive) return;
    validateType(value, Map);

    this.#_map = value;
  }

  /**
   * get debug mode
   * @returns {boolean}
   */
  get debug() {
    return this.#_debug
  }

  /**
   * set debug mode
   * @param value
   */
  set debug(value) {
    this.#_debug = !!value
  }

  /**
   * move the player in a direction for a given distance
   * player will move one unit at a time until it reaches the final point
   * @param {number} direction angle in rads such as Math.PI
   * @param {number} magnitude distance in units
   */
  move(direction, magnitude) {
    if(!this.isAlive) return;
    validateFloat(direction);
    validateSafeInt(magnitude);

    // move one unit at a time so collisions can trigger
    // base each step on the starting unit and increment magnitude by 1
    // this ensures that you hit up to n cells where n is the magnitude

    if (magnitude > 0) {
      const startingPosition = this.position;
      for (
        let distanceTraveled = 1;
        distanceTraveled <= magnitude;
        distanceTraveled++
      ) {
        if(!this.isAlive) return;// check before each new step
        let movement = polarToCoordinate(direction, distanceTraveled);
        let nextPosition = new Vector(
          startingPosition.x + movement.x,
          startingPosition.y + movement.y
        );

        if (!this.map.is(nextPosition)) {
          const wormhole = new Wormhole();
          wormhole.onPlayerCollision(this);
          break;
        }

        this.position = nextPosition;
        this.energy -= 10;
      }

      const currentCell = this.map.get(this.position)
      switch (true) {
        case currentCell instanceof AbandonedFreighter:
          this.state = PlayerState.Freighter
          break
        case currentCell instanceof Planet:
          this.state = PlayerState.NearPlanet
          break
        default:
          this.state = PlayerState.Space
          break
      }

      this.supplies = this.supplies - 2;
    }
  }

  /**
   * scan the map and reveal points
   * @param {Vector} position position to center the scan at
   * @param {number} radius distance of the scan
   */
  scan(position, radius) {
    if(!this.isAlive) return;
    const startX = clamp(position.x - radius, 0, this.map.size - 1);
    const endX = clamp(position.x + radius, 0, this.map.size - 1);
    const startY = clamp(position.y - radius, 0, this.map.size - 1);
    const endY = clamp(position.y + radius, 0, this.map.size - 1);

    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        this.map.revealPosition(new Vector(i, j));
      }
    }
    this.supplies = this.supplies - 2;
  }

  enterOrbit() {
    if(!this.isAlive) return;
    if(player.state !== PlayerState.NearPlanet) throw `Can not enter orbit planet from current state. ${this.#_state}`
    this.supplies = this.supplies - 1
    this.#_state = PlayerState.OrbitPlanet
  }

  exitOrbit() {
    if(!this.isAlive) return;
    if(player.state !== PlayerState.OrbitPlanet) throw `Can not exit orbit planet from current state. ${this.#_state}`
    this.supplies = this.supplies - 1
    this.#_state = PlayerState.NearPlanet
  }

  land() {
    if(!this.isAlive) return;
    if(player.state !== PlayerState.OrbitPlanet) throw `Can not land on planet from current state. ${this.#_state}`
    this.supplies = this.supplies - 1;
    this.#_state = PlayerState.LandedOnPlanet
  }

  liftoff() {
    if(!this.isAlive) return;
    if(player.state !== PlayerState.LandedOnPlanet) throw `Can not land on planet from current state. ${this.#_state}`
    this.supplies = this.supplies - 1;
    this.#_state = PlayerState.OrbitPlanet
  }

  debugInfo() {
    const cells = {};
    this.map.cells.forEach((column, x) => {
      column.forEach((cell, y) => {
        if(cell.name !== undefined) {
          if (!cells[cell.name]) {
            cells[cell.name] = [];
          }

          cells[cell.name].push(this.#debugCell(cell, new Vector(x, y)))
        }
      })
    })

    const debug = {
      'player': {
        'state':          this.state.name,
        'supplies':       this.supplies,
        'energy':         this.energy,
        'energyCapacity': this.energyCapacity,
        'credits':        this.credits,
        'position':       `(${this.position.x}, ${this.position.y})`,
        'cell':           this.#debugCell(player.map.get(player.position), player.position)
      },
      'Map': cells
    }
    return `<pre><code class="language-js">${JSON.stringify(debug, null,  4)}</code></pre>`
  }

  #debugCell(cell, position) {
    let debugInfo = {
      'name':            cell.name,
      'position':        `(${position.x}, ${position.y})`,
      'isHidden':        cell.isHidden,
      'backgroundColor': cell.backgroundColor,
    }

    if(cell instanceof Pentium) {
      debugInfo = {
        ...debugInfo,
        'recipe': cell.hasRecipe,
        'number': cell.number,
      }
    }
    if(cell instanceof AbandonedFreighter) {
      debugInfo = {
        ...debugInfo,
        'energy':   cell.energy,
        'supplies': cell.supplies,
      }
    }

    return debugInfo
  }

  /**
   * get html representation of the player
   * @returns {string} table with player stats
   */
  toString() {
    return `<table class="table table-sm table-hover table-borderless">
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
                            <div class="progress-bar bg-success" role="progressbar" style="width: ${clamp(normalize(this.energy, this.energyCapacity) * 100, 0, 100)}%;" aria-valuenow="${this.energy}" aria-valuemin="0" aria-valuemax="${this.energyCapacity}">
                                ${this.energy}/${this.energyCapacity}
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>Supplies</th>
                    <td>
                        <div class="progress" style="height: 24px;">
                            <div class="progress-bar bg-warning" role="progressbar" style="width: ${this.supplies}%;" aria-valuenow="${this.supplies}" aria-valuemin="0" aria-valuemax="100">
                                ${this.supplies}%
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>`;
  }
}

/**
 * game map
 */
class Map {
    size
    cells

    /**
     * create a map instnace
     * @param {number} size size of map
     * @param {array<array<Cell>>} cells map cells
     */
    constructor(size, cells) {
        this.size = size || 128
        this.cells = cells || filledArray2(this.size, () => new Cell())
    }

    /**
     * get size of map
     * @returns {number}
     */
    get size() {
        return this.size
    }

    /**
     * set map size value
     * @param value
     */
    set size(value) {
        validateSafeInt(value)
        // todo remove cells or add empty cells

        this.size = value
    }

    /**
     * set the maps cells
     * @param {array<array<Cell>>} value
     */
    set cells(value) {
        validateArray2Size(value, this.size)
        this.cells = filledArray2(this.size, () => null)
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                validateType(value[i][i], Cell)
                this.cells[i][j]  = value[i][j]
            }
        }
    }

    /**
     * check if valid map position
     * @param {Vector} position
     * @returns {boolean}
     */
    is(position) {
        return this.cells[position.x] !== undefined && this.cells[position.y] !== undefined
    }

    /**
     * get cell at position
     * @param {Vector} position
     * @returns {Cell}
     */
    get(position) {
        validateMapPosition(position, this)
        return this.cells[position.x][position.y]
    }

    /**
     * replaces cell in position
     * @param position
     * @param cell
     */
    set(position, cell) {
        validateMapPosition(position, this)
        validateType(cell, Cell)

        this.cells[position.x][position.y] = cell
    }

    /**
     * get the position of a random cell
     * @returns {Vector}
     */
    getRandomCellPosition() {
        return new Vector(Math.floor(Math.random() * this.cells.length - 1) + 1, Math.floor(Math.random() * this.cells.length - 1) + 1)
    }

    /**
     * replaces a random empty cell with the one specified
     * @param {Cell} cell
     */
    replaceRandomEmptyCell(cell) {
        validateType(cell, Cell)
        let position = this.getRandomCellPosition()
        let cellAtPosition = this.cells[position.x][position.y]
        while(cellAtPosition.constructor.name !== "Cell") { // violates liskov principle, refactor so cells contain things instead of things extending from cell
            position = this.getRandomCellPosition()
        }

        this.cells[position.x][position.y] = cell
    }

    /**
     * makes the position as revealed
     * @param {Vector} position
     */
    revealPosition(position) {
        validateMapPosition(position, this)
        this.get(position).isHidden = false
    }

    /**
     * check if a position is revealed
     * @param {Vector} position
     * @returns {boolean}
     */
    isRevealed(position) {
        validateMapPosition(position, this)
        return !this.get(position).isHidden
    }

    /**
     * trigger player collision with cell
     * @param player
     */
    triggerPlayerCollision(player) {
        validateMapPosition(player.position, this)
        validateType(player, Player)
        this.cells[player.position.x][player.position.y].onPlayerCollision(player)
    }

    /**
     * get html representation of map
     * @returns {string}
     */
    toString()
    {
        let string = `<div class="game-map">`
        for(let y = this.cells.length - 1; y >= 0; y--) {
            string += `<div class="map-row">`
            for(let x = 0; x < this.cells.length; x++) {
                const cell = this.cells[x][y]
                string += `<div class="map-cell" style="background-color: ${cell.isHidden ? `#666` : cell.backgroundColor};">&nbsp;</div>`
            }
            string += `</div>`
        }
        return string
    }
}
class Map {
    #size
    #cells
    #viewed

    constructor(size, cells) {
        this.size = size || 128
        this.cells = cells || filledArray2(this.size, new Cell())
    }

    get size() {
        return this.#size
    }

    set size(value) {
        this.#size = value
    }

    set cells(value) {
        if(!Array.isArray(value) || value.length < this.size || !Array.isArray(value[0]) || value[0].length < this.size)
            throw `cells must be a multidimensional array`

        this.#cells = filledArray2(this.size, null)
        this.#viewed = filledArray2(this.size, false)
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if(!value[i][i] instanceof Cell)
                    throw `invalid cell at ${i}, ${j}. Expected instance of cell. Given ${value[i][i].name}`

                this.#cells[i][j] = value[i][j]
                //mark as viewed if its always viewable tile
            }
        }
    }

    cell(position) {
        return this.#cells[position.x][position.y]
    }

    revealPosition(position) {
        this.#viewed[position.x][position.y] = true
    }

    isRevealed(position) {
        return this.#viewed[position.x][position.y]
    }

    triggerPlayerCollision(player) {
        this.#cells[player.position.x][player.position.y].onPlayerCollision(player)
    }
}
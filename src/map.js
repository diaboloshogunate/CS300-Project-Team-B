class Map {
    #size
    #cells
    #visited

    constructor(size, cells) {
        this.size = size || 127
        this.cells = cells
    }

    get size() {
        return this.#size
    }

    set size(value) {
        this.#size = value
    }

    get cells() {
        return this.#cells
    }

    set cells(value) {
        if(!Array.isArray(value) || value.length < this.size || !Array.isArray(value[0]) || value[0].length < this.size)
            throw `cells must be a multidimensional array`

        this.#cells = [[]]
        for (let i = 0; i < this.size; i++) {
            this.#cells[i][i] = this.#cells[i][i]
        }
    }

    getCell(x, y) {
        return this.#cells[x][y]
    }

    get visited() {
        return this.#visited
    }

    resetVisited() {
        this.#visited = [[]]
        for (let i = 0; i < this.size; i++) {
            this.#visited[i][i] = false
        }
    }

    markCellAsVisited(x, y) {
        this.#visited[x][y] = true
    }

    hasCellBeenVisited(x, y) {
        return this.#visited[x][y]
    }
}
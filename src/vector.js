class Vector {
    #_x
    #_y

    /**
     * create a vector
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x || 0
        this.y = y || 0
    }

    /**
     * get x position
     * @returns {number}
     */
    get x () {
        return this.#_x
    }

    /**
     * set x position
     * @param {number} value
     */
    set x(value) {
        validateSafeInt(value)

        this.#_x = value
    }

    /**
     * get y position
     * @returns {number}
     */
    get y() {
        return this.#_y
    }

    /**
     * set y position
     * @param {number} value
     */
    set y(value) {
        validateSafeInt(value)

        this.#_y = value
    }
}
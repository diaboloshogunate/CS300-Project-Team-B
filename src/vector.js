class Vector {
    #x
    #y

    constructor(x, y) {
        this.x = x || 0
        this.y = y || 0
    }

    get x () {
        return this.#x
    }

    set x(value) {
        if(!Number.isSafeInteger(value)) {
            throw `x must be a safe integer. Provided ${value}`
        }

        this.#x = value
    }

    get y() {
        return this.#y
    }

    set y(value) {
        if(!Number.isSafeInteger(value))
            throw `y must be a safe integer. Provided ${value}`

        this.#y = value
    }
}
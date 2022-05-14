/**
 * clamps value between two numbers
 * @param {number} num number to clamp
 * @param {number} min min allowed value
 * @param {number} max max allowed value
 * @returns {number}
 */
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

/**
 * converts direction and magnitude to a vector
 * @param {number} direction
 * @param {number} magnitude
 * @returns {Vector} vector representation of direction and magnitude
 */
const polarToCoordinate = (direction, magnitude)  => new Vector(Math.round(magnitude * Math.cos(direction)), Math.round(magnitude * Math.sin(direction)))

/**
 * convert degress to radians
 * @param {number} degree
 * @returns {number} radians
 */
const degreeToRad = (degree) => { return degree * (Math.PI / 180.0) }

/**
 * fill an array
 * @param {number} size
 * @param {function} generator
 * @returns {array<*>}
 */
const filledArray = (size, generator) => {
    validateSafeInt(size)

    const a = []
    for (let i = 0; i < size; i++) {
        a.push(generator())
    }

    return a
}

/**
 * fill a 2d array
 * @param {number} size
 * @param {function} generator function that return what to fill the arrays with
 * @returns {array<array<*>>} 2d aray of the specified size and filled by the generator
 */
const filledArray2 = (size, generator) => {
    if(!size) return [[]]

    const a = []
    for (let i = 0; i < size; i++) {
        a.push(filledArray(size, generator))
    }

    return a
}

/**
 * normalize value to 0-1
 * @param {number} value
 * @param {number} maxValue
 * @returns {number}
 */
const normalize = (value, maxValue) => {
    return clamp(value / maxValue, 0, maxValue)
}

/**
 *
 * @param value
 */
const validateSafeInt = (value) => {
    if(!Number.isSafeInteger(value))
        throw `Invalid value. Must be a safe integer. Provided ${value}`
}

/**
 * validates if the value is a float
 * throws an exception on failure
 * @param {number} value
 */
const validateFloat = (value) => {
    value = parseFloat(value)

    if(isNaN(value))
        throw `Invalid value. Must be a float. Provided ${value}`
}

/**
 * validate the type for a value
 * throws an exception on failure
 * @param {*} value
 * @param {*} type
 */
const validateType = (value, type) => {
    if(!value instanceof type)
        throw `Invalid type. value must be an instance of ${type}. Provided ${value.name}`
}
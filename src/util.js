const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const polarToCoordinate = (direction, magnitude)  => new Vector(Math.round(magnitude * Math.cos(direction)), Math.round(magnitude * Math.sin(direction)))

const degreeToRad = (degree) => { return degree * (Math.PI / 180.0) }

const filledArray = (size, generator) => {
    const a = []
    for (let i = 0; i < size; i++) {
        a.push(generator())
    }

    return a
}

const filledArray2 = (size, generator) => {
    if(!size) return [[]]

    const a = []
    for (let i = 0; i < size; i++) {
        a.push(filledArray(size, generator))
    }

    return a
}

const normalize = (value, maxValue) => {
    return clamp(value / maxValue, 0, maxValue) * 100
}
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const polarToCoordinate = (direction, magnitude)  => new Vector(Math.round(magnitude * Math.cos(direction)), Math.round(magnitude * Math.sin(direction)))

const degreeToRad = (degree) => { return degree * (Math.PI / 180.0) }
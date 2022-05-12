QUnit.module('util.js', function() {
    QUnit.test('clamp', assert => {
        assert.equal(clamp(1,0,2), 1, `clamp 1 between 0 and 2`)
        assert.equal(clamp(-1,0,2), 0, `clamp -1 between 0 and 2`)
        assert.equal(clamp(3,0,2), 2, `clamp 3 between 0 and 2`)
    });
    QUnit.test('filled array', assert => {
        assert.equal(JSON.stringify(filledArray(0, 0)), JSON.stringify([]))
        assert.equal(JSON.stringify(filledArray(1, 0)), JSON.stringify([0]))
        assert.equal(JSON.stringify(filledArray(2, "a")), JSON.stringify(["a", "a"]))
    });
    QUnit.test('filled array2', assert => {
        assert.equal(JSON.stringify(filledArray2(0, 0)), JSON.stringify([[]]))
        assert.equal(JSON.stringify(filledArray2(1, 0)), JSON.stringify([[0]]))
        assert.equal(JSON.stringify(filledArray2(2, "a")), JSON.stringify([["a", "a"], ["a", "a"]]))
    });
    QUnit.test('degreeToRad', assert => {
        assert.equal(degreeToRad(0), 0)
        assert.equal(degreeToRad(180), Math.PI)
        assert.equal(degreeToRad(90), Math.PI/2)
        assert.equal(degreeToRad(270), 3*Math.PI/2)
    });
    QUnit.test('polarToCoordinate 0, 1', assert => {
        const coordinate = polarToCoordinate(0, 1)
        assert.equal(coordinate.x, 1)
        assert.equal(coordinate.y, 0)
    });
    QUnit.test('polarToCoordinate PI, 2', assert => {
        const coordinate = polarToCoordinate(Math.PI, 2)
        assert.equal(coordinate.x, -2)
        assert.equal(coordinate.y, 0)
    });
    QUnit.test('polarToCoordinate PI/2, 3', assert => {
        const coordinate = polarToCoordinate(Math.PI/2, 3)
        assert.equal(coordinate.x, 0)
        assert.equal(coordinate.y, 3)
    });
    QUnit.test('polarToCoordinate 3PI/2, 3', assert => {
        const coordinate = polarToCoordinate(3*Math.PI/2, 3)
        assert.equal(coordinate.x, 0)
        assert.equal(coordinate.y, -3)
    });
    QUnit.test('polarToCoordinate PI/4, 2', assert => {
        const coordinate = polarToCoordinate(Math.PI/4, 2)
        assert.equal(coordinate.x, 1)
        assert.equal(coordinate.y, 1)
    });
})
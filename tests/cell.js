QUnit.module('cell.js', function() {
    QUnit.test('cell', assert => {
        const cell = new Cell()
        assert.equal(cell instanceof Cell, true)
    });
})
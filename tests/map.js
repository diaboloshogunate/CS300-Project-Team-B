QUnit.module('map.js', function() {
    QUnit.test('map defaults', assert => {
        const map = new Map()
        assert.equal(map.size, 128)
        assert.equal(map.get(new Vector(0,0)) instanceof Cell, true)
        assert.equal(map.get(new Vector(127,127)) instanceof Cell, true)
        assert.equal(map.isRevealed(new Vector(0,0)), false)
        assert.equal(map.isRevealed(new Vector(127,127)), false)
    });
    QUnit.test('map set/get cell', assert => {
        const map = new Map(2)
        map.revealPosition(new Vector(0,0))
        map.set(new Vector(1,1), new Wormhole())
        assert.equal(map.get(new Vector(1,1)) instanceof Wormhole, true)
    });
    QUnit.test('map reveal', assert => {
        const map = new Map(2)
        map.revealPosition(new Vector(0,0))
        assert.equal(map.size, 2)
        assert.equal(map.get(new Vector(0,0)) instanceof Cell, true)
        assert.equal(map.isRevealed(new Vector(0,0)), true)
    });
    QUnit.test('map cell collision', assert => {
        const cell = new Cell()
        sinon.spy(cell, "onPlayerCollision")
        const map = new Map(1, [[cell]])
        const playerSpy = sinon.spy(function() {
            return sinon.createStubInstance(Player);
        })
        playerSpy.position = new Vector(0,0)

        map.triggerPlayerCollision(playerSpy)
        assert.equal(cell.onPlayerCollision.calledOnce, true);
    });
})
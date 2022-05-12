QUnit.module('wormhole.js', function() {
    QUnit.test('wormhole defaults', assert => {
        const wormhole = new Wormhole()
        assert.equal(wormhole instanceof Cell, true)
        assert.equal(wormhole instanceof Wormhole, true)
        assert.equal(wormhole.isHidden, true)
    });
    QUnit.test('wormhole onPlayerCollision', assert => {
        const map = new Map(2)
        const wormhole = new Wormhole()
        const player = new Player(new Vector(1,1), 100, 100, 100, map)
        wormhole.onPlayerCollision(player)
        assert.equal(player.position.x === 1 && player.position.y === 1, false)
    });
})
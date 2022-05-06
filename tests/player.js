QUnit.module('player.js', function() {
    QUnit.test('move 0', assert => {
        let player = new Player(new Vector(5,5), 1000, 100)
        player.move(0, 2)

        assert.equal(player.position.x, 7, 'moved 2 in x direction')
        assert.equal(player.position.y, 5, 'moved 0 in y direction')
        assert.equal(player.supplies, 98, 'lost 2% in supplies on movement')
        assert.equal(player.energy, 980, 'lost 10 energy per unit moved')
    });
})
QUnit.module('player.js', function() {
    QUnit.test('constructor values', assert => {
        let player = new Player(new Vector(5,5), 1000, 1000, 100, 1000, new Map(10))

        assert.equal(player.position.x, 5, '5 x position')
        assert.equal(player.position.y, 5, '5 y position')
        assert.equal(player.supplies, 100, '100 supplies')
        assert.equal(player.energy, 1000, '1000 energy capacity')
    });

    QUnit.test('move 0', assert => {
        let player = new Player(new Vector(5,5), 1000, 1000, 100, 1000, new Map(10))
        player.move(0, 2)

        assert.equal(player.position.x, 7, 'moved 2 in x direction')
        assert.equal(player.position.y, 5, 'moved 0 in y direction')
        assert.equal(player.supplies, 98, 'lost 2% in supplies on movement')
        assert.equal(player.energy, 980, 'lost 10 energy per unit moved')
    });

    QUnit.test('move 90', assert => {
        let player = new Player(new Vector(5,5), 1000, 1000, 100, 1000, new Map(10))
        player.move(degreeToRad(90), 3)

        assert.equal(player.position.x, 5, 'moved 2 in x direction')
        assert.equal(player.position.y, 8, 'moved 0 in y direction')
        assert.equal(player.supplies, 98, 'lost 2% in supplies on movement')
        assert.equal(player.energy, 970, 'lost 10 energy per unit moved')
    });

    QUnit.test('move 180', assert => {
        let player = new Player(new Vector(5,5), 1000, 1000, 100, 1000, new Map(10))
        player.move(degreeToRad(180), 3)

        assert.equal(player.position.x, 2, 'moved 2 in x direction')
        assert.equal(player.position.y, 5, 'moved 0 in y direction')
        assert.equal(player.supplies, 98, 'lost 2% in supplies on movement')
        assert.equal(player.energy, 970, 'lost 10 energy per unit moved')
    });

    QUnit.test('move 270', assert => {
        let player = new Player(new Vector(5,5), 1000, 1000, 100, 1000, new Map(10))
        player.move(degreeToRad(270), 3)

        assert.equal(player.position.x, 5, 'moved 2 in x direction')
        assert.equal(player.position.y, 2, 'moved 0 in y direction')
        assert.equal(player.supplies, 98, 'lost 2% in supplies on movement')
        assert.equal(player.energy, 970, 'lost 10 energy per unit moved')
    });

    QUnit.test('move off grid', assert => {
        let player = new Player(new Vector(0,0), 1000, 1000, 100, 1000, new Map(10))
        player.move(degreeToRad(180), 1)

        assert.false(player.position.x === 0 && player.position.x === 0, 'did not move')
        assert.false(player.position.x === -1 && player.position.x === 0, 'did not trigger wormhole')
    });
})
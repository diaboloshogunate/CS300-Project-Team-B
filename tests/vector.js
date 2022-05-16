QUnit.module('Vector', function() {
    QUnit.test('vector setter/getters', assert => {
        let vector1 = new Vector(2, 3)
        vector1.x = 1
        vector1.y = 5

        assert.equal(vector1.x, 1, 'x setter/getter')
        assert.equal(vector1.y, 5, 'y setter/getter')
    });

    QUnit.test('vector constructor', assert => {
        let vector1 = new Vector()
        assert.equal(vector1.x, 0, 'x is initialized to 0')
        assert.equal(vector1.y, 0, 'y is initialized to 0')

        let vector2 = new Vector(2, 3)
        assert.equal(vector2.x, 2, 'x is initialized to 2 via constructor')
        assert.equal(vector2.y, 3, 'y is initialized to 3 via constructor')
    });

    QUnit.test('unsafe int throws exception', assert => {
        assert.throws(
            () => {
                new Vector(Math.pow(2, 53), 0)
            },
            /^Invalid value. Must be a safe integer. Provided/
        )

        assert.throws(
            () => {
                new Vector(0, Math.pow(2, 53))
            },
            /^Invalid value. Must be a safe integer. Provided/
        )
    });

    QUnit.test('string throws exception', assert => {
        assert.throws(
            () => {
                new Vector('a', 0)
            },
            /^Invalid value. Must be a safe integer. Provided/
        )

        assert.throws(
            () => {
                new Vector(0, 'b')
            },
            /^Invalid value. Must be a safe integer. Provided/
        )
    });

    QUnit.test('object throws exception', assert => {
        assert.throws(
            () => {
                new Vector({}, 0)
            },
            /^Invalid value. Must be a safe integer. Provided/
        )

        assert.throws(
            () => {
                new Vector(0, {})
            },
            /^Invalid value. Must be a safe integer. Provided/
        )
    });

    QUnit.test('float throws exception', assert => {
        assert.throws(
            () => {
                new Vector(1.5, 0)
            },
            /^Invalid value. Must be a safe integer. Provided/
        )

        assert.throws(
            () => {
                new Vector(0, -1.9)
            },
            /^Invalid value. Must be a safe integer. Provided/
        )
    });
})
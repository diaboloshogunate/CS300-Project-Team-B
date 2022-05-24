QUnit.module('eventManager.js', function() {
    QUnit.test('simple event', assert => {
        const eventManager = new EventManager()
        let counter = 0
        eventManager.subscribe(Event.playerMessage, () => counter++)
        eventManager.trigger(Event.playerMessage, counter)
        assert.equal(counter, 1, 'event fired')
    });
    QUnit.test('multiple event listeners', assert => {
        const eventManager = new EventManager()
        let counter = 0
        eventManager.subscribe(Event.playerMessage, () => counter++)
        eventManager.subscribe(Event.playerMessage, () => counter++)
        eventManager.subscribe(Event.playerMessage, () => counter++)
        eventManager.trigger(Event.playerMessage, counter)
        assert.equal(counter, 3, 'event fired')
    });
    QUnit.test('multiple event and listeners', assert => {
        const eventManager = new EventManager()
        let counter1 = 0
        let counter2 = 0
        eventManager.subscribe(Event.playerMessage, () => counter1++)
        eventManager.subscribe(Event.playerMessage, () => counter1++)
        eventManager.subscribe(Event.playerDeath, () => counter2++)
        eventManager.trigger(Event.playerMessage, counter1)
        eventManager.trigger(Event.playerDeath, counter2)
        assert.equal(counter1, 2, 'event 1 fired')
        assert.equal(counter2, 1, 'event 2 fired')
    });
    QUnit.test('test singleton', assert => {
        const eventManager1 = new EventManager()
        const eventManager2 = new EventManager()
        let counter = 0
        eventManager1.subscribe(Event.playerMessage, () => counter++)
        eventManager2.trigger(Event.playerMessage, counter)
        assert.equal(counter, 1, 'event fired')
    });
})
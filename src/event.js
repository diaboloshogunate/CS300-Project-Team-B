/**
 * Events that can be triggered or subscribed too
 */
class Event
{
    /**
     * player messages. Passes in a string arg for the message to send
     * @type {Event}
     */
    static playerMessage = new Event("player.message")

    /**
     * player died. Passes no args
     * @type {Event}
     */
    static playerDeath = new Event("player.death")

    constructor(name) {
        this.name = name
    }
}
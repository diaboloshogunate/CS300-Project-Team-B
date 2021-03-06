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

    /**
     * enable debug
     * @type {Event}
     */
    static EnableDebug = new Event("config.debug_enabled")

    /**
     * Show debug
     * @type {Event}
     */
    static DisableDebug = new Event("config.debug_disable")

    /**
     * won the game
     * @type {Event}
     */
    static Win = new Event("game.won")

    /**
     * lost the game
     * @type {Event}
     */
    static Lose = new Event("game.lost")

    constructor(name) {
        this.name = name
    }
}
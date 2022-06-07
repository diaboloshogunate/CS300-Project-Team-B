/**
 * Player States for state management
 */
class PlayerState
{
    /**
     * in an empty spot in space
     * @type {PlayerState}
     */
    static Space = new PlayerState("state.space")

    /**
     * in an empty spot in space
     * @type {PlayerState}
     */
    static Freighter = new PlayerState("state.freighter")

    constructor(name) {
        this.name = name
    }
}
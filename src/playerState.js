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
     * in same space as a freighter
     * @type {PlayerState}
     */
    static Freighter = new PlayerState("state.freighter")

    /**
     * in same space as a planet
     * @type {PlayerState}
     */
    static NearPlanet = new PlayerState("state.planet.near")

    /**
     * orbiting the planet
     * @type {PlayerState}
     */
    static OrbitPlanet = new PlayerState("state.planet.orbit")

    /**
     * landed on the planet
     * @type {PlayerState}
     */
    static LandedOnPlanet = new PlayerState("state.planet.landed")

    /**
     * player died
     * @type {PlayerState}
     */
    static Dead = new PlayerState("state.dead")

    constructor(name) {
        this.name = name
    }
}
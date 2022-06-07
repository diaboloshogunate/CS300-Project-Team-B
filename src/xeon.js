class Xeon extends Planet {
    // has fully upgraded musk center

    isHidden = false
    backgroundColor = `#144587`

    get name () {
        return `Xeon`
    }

    deliverCargo(wallet, ship) {

    }

    onPlayerCollision(player) {
        if(!player instanceof Player)
            throw `onPlayerCollision requires the player is passed in as an argument`
        console.log('Collided with pentium')
        this.eventManager.trigger(Event.playerMessage, `Collision with Xeon`)
    }
}
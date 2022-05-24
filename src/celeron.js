class Celeron extends Planet {
    // has fully upgraded musk center

    isHidden = false
    backgroundColor = `#004b88`

    receiveCargo(wallet, ship) {
        // get contract and load cargo for 100 credits
    }

    onPlayerCollision(player) {
        if(!player instanceof Player)
            throw `onPlayerCollision requires the player is passed in as an argument`
        console.log('Collided with pentium')
        this.eventManager.trigger(Event.playerMessage, `Collision with Celeron`)
    }
}
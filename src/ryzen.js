class Ryzen extends Planet {
    // 3x the cost for energy and supplies
    // if casinian is there option to play game of change to win/lose 100 credits

    isHidden = false
    backgroundColor = `#fe5b11`

    deliverCargo(wallet, ship) {
        // get 1k credits and mark the player as a theif
    }

    get name () {
        return `Ryzen`
    }

    onPlayerCollision(player) {
        if(!player instanceof Player)
            throw `onPlayerCollision requires the player is passed in as an argument`
        console.log('Collided with pentium')
        this.eventManager.trigger(Event.playerMessage, `Collision with Ryzen`)
    }
}
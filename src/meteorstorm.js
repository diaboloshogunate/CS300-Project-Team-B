class MeteorStorm extends Cell {
    backgroundColor = `#ab6920`

    get name () {
        return `Meteor Storm`
    }

    onPlayerCollision(player) {
        super.onPlayerCollision(player);
        // damage ship
        this.eventManager.trigger(Event.playerMessage, `Collision with meteor storm. Ship is damaged`)
    }
}
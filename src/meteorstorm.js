class MeteorStorm extends Cell {
    onPlayerCollision(player) {
        super.onPlayerCollision(player);
        // damage ship
        this.eventManager.trigger(Event.playerMessage, `Collision with meteor storm. Ship is damaged`)
    }
}
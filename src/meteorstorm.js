class MeteorStorm extends Cell {
    onPlayerCollision(player) {
        super.onPlayerCollision(player);
        // damage ship
        player.messages= "Collision with meteor storm. Ship is damaged"
    }
}
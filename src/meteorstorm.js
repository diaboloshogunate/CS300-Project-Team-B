class MeteorStorm extends Cell {
    onPlayerCollision(player) {
        super.onPlayerCollision(player);
        // damage ship
        player.message = "Collsion with meteor storm. Ship is damaged"
    }
}
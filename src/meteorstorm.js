class MeteorStorm extends Cell {
    onPlayerCollision(player) {
        super.onPlayerCollision(player);
        // damage ship
        player.messages= "Collsion with meteor storm. Ship is damaged"
    }
}
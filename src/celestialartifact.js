class CelestialArtifact extends Cell {
    onPlayerCollision(player) {
        super.onPlayerCollision(player);
        let roll  = Math.random()

        // we fight them off
        roll -= 0.9
        if(roll <= 0) {
            //damage ship
            return
        }

        roll -= 0.1
        if(roll <= 0) {
            //destroy ship
        }
    }
}
class Cell {
    onPlayerCollision(player) {
        if(!player instanceof Player)
            throw `onPlayerCollision requires the player is passed in as an argument`
    }
}

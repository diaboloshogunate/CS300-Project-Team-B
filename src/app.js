let mapSize = 128;
let attemptLoad = true;
let startingPosition = new Vector(0,0);
let startingEnergy   = 1000;
let startingSupplies = 90;
let startingCredits = 1000;
let immortal = false;
let fixedWormholeBehavior = false;
let fixedWormholeLocation = new Vector(0,0);
let startingMap = setMap();
let player = new Player(startingPosition, startingEnergy, 1000, startingSupplies, startingCredits ,startingMap);
const eventManager = new EventManager()

eventManager.subscribe(Event.playerMessage, (message) => {
    document.getElementById('message').value = message
})

function proceed(){
    let direction = document.getElementById('direction')
    let distance = document.getElementById('distance')
    let current_location = document.getElementById('location')
    let energy = document.getElementById('energy')
    let supplies = document.getElementById('supplies')
    let credits = document.getElementById('credits')
    
    player.move(degreeToRad(parseInt(direction.value)),parseInt(distance.value));
    
    let position = player.position
    current_location.value = "(" + position.x +","+position.y +")"
    energy.value = player.energy
    supplies.value = player.supplies
    credits.value = player.credits
    console.log(player)
    render()
}

function scanner(){
    let position = player.position
    player.scan(position, 2);
    supplies.value = player.supplies
    render()
}

function render() {
    document.getElementById('game-player-stats').innerHTML = player.toString()
    document.getElementById('game-map').innerHTML = player.map.toString() + `<div id="game-map-player" style="left: ${player.position.x * 8 + 2}px; bottom: ${player.position.y * 8 + 2}px;"></div>`
}

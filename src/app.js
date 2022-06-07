let northLimit = 128;
let eastLimit = 128;
let startingPosition = new Vector(0,0);
let startingEnergy   = 1000;
let startingSupplies = 90;
let startingCredits = 1000;
let immortal = false;
let fixedWormholeBehavior = false;
let fixedWormholeLocation = new Vector(0,0);
let startingMap = setMap();
const eventManager = new EventManager()
let player = new Player(startingPosition, startingEnergy, 1000, startingSupplies, startingCredits ,startingMap);

for(let n = 0; n <= 10; n++) {
    const freighter = new AbandonedFreighter();
    freighter.energy = Math.floor(Math.random() * 500) + 1;
    freighter.supplies = Math.floor(Math.random() * 100) + 1;
    startingMap.replaceRandomEmptyCell(freighter)
}

eventManager.subscribe(Event.playerMessage, (message) => {
    document.getElementById('message').value = message
})

function move(){
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

    render()
}

function collectFreighterSupplies() {
    const currentCell = player.map.get(player.position)
    if (player.state !== PlayerState.Freighter || !(currentCell instanceof AbandonedFreighter)) console.error(`Incorrect state or cell for action`);
    currentCell.transferEnergyAndSupplies(player)

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

    renderButtons()
    renderDebug()
}

function renderButtons() {
    const scannerButton = document.getElementById('scanner-action')
    const moveButton    = document.getElementById('move-action')
    const freightButton = document.getElementById('freight-action')

    // hide all of them and reveal based on state
    scannerButton.classList.add('invisible')
    moveButton.classList.add('invisible')
    freightButton.classList.add('invisible')

    switch (player.state) {
        case PlayerState.Freighter:
            moveButton.classList.remove('invisible')
            scannerButton.classList.remove('invisible')
            freightButton.classList.remove('invisible')
            break
        case null:
        case PlayerState.Space:
            moveButton.classList.remove('invisible')
            scannerButton.classList.remove('invisible')
            break
        default:
            break
    }
}

function renderDebug() {
    if(player.debug) {
        document.getElementById('game-debug').innerHTML = player.debugInfo()
        Prism.highlightAll()
        return
    }

    document.getElementById('game-debug').innerHTML = ``
}

function debugToggle() {
    player.debug = !player.debug
    renderDebug()
}
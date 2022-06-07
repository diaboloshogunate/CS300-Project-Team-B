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

// update message when one is sent
eventManager.subscribe(Event.playerMessage, (message) => {
    document.getElementById('message').innerHTML = message
})

/**
 * move the player
 */
function move(){
    let direction = document.getElementById('direction')
    let distance = document.getElementById('distance')
    
    player.move(degreeToRad(parseInt(direction.value)),parseInt(distance.value));

    render()
}

/**
 * collect supplies from freighter
 */
function collectFreighterSupplies() {
    const currentCell = player.map.get(player.position)
    if (player.state !== PlayerState.Freighter || !(currentCell instanceof AbandonedFreighter)) console.error(`Incorrect state or cell for action`);
    currentCell.transferEnergyAndSupplies(player)

    render()
}

/**
 * scan nearby
 */
function scanner(){
    let position = player.position
    player.scan(position, 2);

    render()
}

/**
 * take the recipe from the planet
 */
function takeRecipe() {
    const currentCell = player.map.get(player.position)
    if (player.state !== PlayerState.LandedOnPlanet || !(currentCell instanceof Pentium) || !currentCell.hasRecipe) console.error(`Incorrect state or cell for action`);
    currentCell.takeRecipe(player)

    render()
}

/**
 * return the recipe
 */
function returnRecipe() {
    const currentCell = player.map.get(player.position)
    if (player.state !== PlayerState.LandedOnPlanet || !(currentCell instanceof Eniac) || !player.hasRecipe) console.error(`Incorrect state or cell for action`);
    const eventManager = new EventManager()

    player.hasRecipe = false
    eventManager.trigger(Event.Win)
    eventManager.trigger(Event.playerMessage, `A winner is you`)

    render()
}

/**
 * enter planets orbit
 */
function orbitEnter() {
    const currentCell = player.map.get(player.position)
    if (player.state !== PlayerState.NearPlanet || !(currentCell instanceof Planet)) console.error(`Incorrect state or cell for action`);
    player.enterOrbit()

    render()
}

/**
 * exit planets orbit
 */
function orbitExit() {
    const currentCell = player.map.get(player.position)
    if (player.state !== PlayerState.OrbitPlanet || !(currentCell instanceof Planet)) console.error(`Incorrect state or cell for action`);
    player.exitOrbit()

    render()
}

/**
 * land on planet
 */
function land() {
    const currentCell = player.map.get(player.position)
    if (player.state !== PlayerState.OrbitPlanet || !(currentCell instanceof Planet)) console.error(`Incorrect state or cell for action`);
    player.land()

    render()
}

/**
 * lift off planet
 */
function liftOff() {
    const currentCell = player.map.get(player.position)
    if (player.state !== PlayerState.LandedOnPlanet || !(currentCell instanceof Planet)) console.error(`Incorrect state or cell for action`);
    player.liftoff()

    render()
}

/**
 * toggle debug info
 */
function debugToggle() {
    player.debug = !player.debug
    renderDebug()
}

/**
 * update visuals
 */
function render() {
    document.getElementById('game-player-stats').innerHTML = player.toString()
    document.getElementById('game-map').innerHTML = player.map.toString() + `<div id="game-map-player" style="left: ${player.position.x * 8 + 2}px; bottom: ${player.position.y * 8 + 2}px;"></div>`

    renderButtons()
    renderDebug()
}

/**
 * shows/hides action options
 */
function renderButtons() {
    const toggleHiddenClass = `d-none`
    const currentCell       = player.map.get(player.position)
    const scannerButton     = document.getElementById('scanner-action')
    const moveButton        = document.getElementById('move-action')
    const freightButton     = document.getElementById('freight-action')
    const enterOrbitButton  = document.getElementById('enter-orbit-action')
    const exitOrbitButton   = document.getElementById('exit-orbit-action')
    const landButton        = document.getElementById('land-action')
    const liftButton        = document.getElementById('lift-action')
    const takeRecipeButton  = document.getElementById('take-recipe-action')
    const leaveRecipeButton = document.getElementById('leave-recipe-action')

    // hide all of them and reveal based on state
    scannerButton.classList.add(toggleHiddenClass)
    moveButton.classList.add(toggleHiddenClass)
    freightButton.classList.add(toggleHiddenClass)
    enterOrbitButton.classList.add(toggleHiddenClass)
    exitOrbitButton.classList.add(toggleHiddenClass)
    landButton.classList.add(toggleHiddenClass)
    liftButton.classList.add(toggleHiddenClass)
    takeRecipeButton.classList.add(toggleHiddenClass)
    leaveRecipeButton.classList.add(toggleHiddenClass)

    switch (player.state) {
        case PlayerState.Freighter:
            moveButton.classList.remove(toggleHiddenClass)
            scannerButton.classList.remove(toggleHiddenClass)
            freightButton.classList.remove(toggleHiddenClass)
            break
        case null:
        case PlayerState.Space:
            moveButton.classList.remove(toggleHiddenClass)
            scannerButton.classList.remove(toggleHiddenClass)
            break
        case PlayerState.NearPlanet:
            moveButton.classList.remove(toggleHiddenClass)
            scannerButton.classList.remove(toggleHiddenClass)
            enterOrbitButton.classList.remove(toggleHiddenClass)
            break
        case PlayerState.OrbitPlanet:
            exitOrbitButton.classList.remove(toggleHiddenClass)
            landButton.classList.remove(toggleHiddenClass)
            break
        case PlayerState.LandedOnPlanet:
            liftButton.classList.remove(toggleHiddenClass)
            if(currentCell instanceof Pentium && currentCell.hasRecipe) {
                takeRecipeButton.classList.remove(toggleHiddenClass)
            }
            if(currentCell instanceof Eniac && player.hasRecipe) {
                leaveRecipeButton.classList.remove(toggleHiddenClass)
            }
            break
        case PlayerState.Dead:
        default:
            break
    }
}

/**
 * update debug visuals
 */
function renderDebug() {
    if(player.debug) {
        document.getElementById('game-debug').innerHTML = player.debugInfo()
        Prism.highlightAll()
        return
    }

    document.getElementById('game-debug').innerHTML = ``
}
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
let player = new Player(startingPosition, startingEnergy, 1000, startingSupplies, startingCredits ,startingMap);


function proceed(){

    let direction = document.getElementById('direction')
    let distance = document.getElementById('distance')
    let current_location = document.getElementById('location')
    let energy = document.getElementById('energy')
    let supplies = document.getElementById('supplies')
    let credits = document.getElementById('credits')
    let message = document.getElementById('message')
 
    let x = degreeToRad(parseInt(direction.value))
    let y = parseInt(distance.value)
    
    player.move(x,y);
    
    let position = player.position
    current_location.value = "(" + position.x +","+position.y +")"
    energy.value = player.energy
    supplies.value = player.supplies
    credits.value = player.credits
    message.value = player.messages
    console.log(player)
}


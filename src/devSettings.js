function updateConfig()
{
    var valid = true;
    //Get values
    const coordMatch = /^\(([0-9]+),([0-9]+)\)$/
    const north = parseInt(document.getElementById("northLimit").value);
    const east = parseInt( document.getElementById("eastLimit").value);
    const startLocation = document.getElementById("startLocation").value;
    const startEnergy = parseInt( document.getElementById("startEnergy").value);
    const startSupplies = parseInt(document.getElementById("startSupplies").value);
    const startCredits = parseInt(document.getElementById("startEnergy").value);
    const playerImmortal = document.getElementById("immortal").checked;
    const fixedWormhole = document.getElementById("fixedWormholeBehavior").checked;
    const wormholeLocation = document.getElementById("fixedWormholeLocation").value;

    //Parse Values
    const parsedStartLocation = startLocation.match(coordMatch);
    const parsedWormholeLocation = wormholeLocation.match(coordMatch);
    const parsedStartX = parseInt(parsedStartLocation[1]);
    const parsedStartY = parseInt(parsedStartLocation[2]);
    const parsedWormholeX = parseInt(parsedWormholeLocation[1]);
    const parsedWormholeY = parseInt(parsedWormholeLocation[2]);

    //Check validity
    if(east < 10 || north < 10)
        valid = false;
    else if(parsedStartLocation.length != 3 || parsedWormholeLocation.length != 3)
        valid = false;
    else if(parsedStartX < 0 || parsedStartX >= east || parsedStartY < 0 || parsedStartY >= north)
        valid = false;
    else if(parsedWormholeX < 0 || parsedWormholeX >= east || parsedWormholeY < 0 || parsedWormholeY >= north)
        valid = false;
    else if(startEnergy < 1 || startSupplies < 1 || startCredits < 0)
        valid = false;

    alert(
        "North Limit: " + north
    + "\nEast Limit: " + east
    + "\nStart: " + "(" + parsedStartX + "," + parsedStartY + ")"
    + "\nEnergy: " + startEnergy
    + "\nSupplies: " + startSupplies
    + "\nCredits: " + startCredits
    + "\nImmortal: " + playerImmortal
    + "\nFixed Wormhole: " + fixedWormhole
    + "\nFixed Wormhole Location: " + "(" + parsedWormholeX + "," + parsedStartY + ")"
    );

    //Pass values into config and go to game if valid
    if(!valid)
    {
        alert("Invalid values");
    }
    else
    {
        northLimit = north;
        eastLimit = east;
        startingPosition = new Vector(parsedStartX, parsedStartY);
        startingEnergy = startEnergy;
        startingSupplies = startSupplies;
        startingCredits = startCredits;
        immortal = playerImmortal;
        fixedWormholeBehavior = fixedWormhole;
        fixedWormholeLocation.x = parsedWormholeX;
        fixedWormholeLocation.y = parsedWormholeY;
        document.getElementById("location").value = "(" + startingPosition.x + "," + startingPosition.y + ")";
        document.getElementById("energy").value = startingEnergy;
        document.getElementById("supplies").value = startingSupplies;
        document.getElementById("credits").value = startingCredits;
        document.getElementById("game").style.display = "block";
        document.getElementById("devSettings").style.display = "none";
    }

}
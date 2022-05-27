let oldSpiceMap;
function setMap(){
    retrieveMap = localStorage.getItem('oldSpiceMap');
    if( attemptLoad){ //Had to add this so you can change the map with dev settings
        oldSpiceMap = JSON.parse(retrieveMap);
        if(oldSpiceMap != null)
            return setStoredMap();
    }
    return setRandMap();
}
function randomPlacement(){
    let artifacts = {};
    let x;
    let y;
    let setCoordinates= () =>{
        let position = new Object;
        let x = Math.floor(Math.random() * mapSize);
        let y = Math.floor(Math.random() * mapSize);
        position['x'] = x;
        position['y'] = y;
        return position;
    }
    for(let i = 1; i <= 7; i++){
        artifacts["planet" + i] = setCoordinates();
    }
    artifacts["astroidField"] = setCoordinates()
    artifacts["celeron"] = setCoordinates();
    artifacts["ryzen"] = setCoordinates();
    artifacts["xeon"] = setCoordinates();
    return artifacts;

}
function setRandMap(){
    console.log('set random')
    let map = new Map(mapSize, filledArray2(mapSize, () => new Cell()));

    let artifacts = randomPlacement();
    let recipeLocation = Math.floor(Math.random() * 7);
    let planet;

    for(let i = 1; i <= 7; i++){
        if(i === recipeLocation) 
            planet= new Pentium(artifacts['planet' + i],i,true)
        else
            planet= new Pentium(artifacts['planet' + i],i,false)
        map.set(artifacts['planet' + i],planet);
    }
    
    let meteor= new MeteorStorm();
    map.set(artifacts['astroidField'], meteor);
    let celeron = new Celeron();
    map.set(artifacts['celeron'], celeron);
    let ryzen= new Ryzen();
    map.set(artifacts['ryzen'], ryzen);
    let xeon = new Xeon();
    map.set(artifacts['xeon'], xeon);
    return map;


}
function setStoredMap(){

    artifacts = oldSpiceMap;
    let map = new Map();

    let recipeLocation = artifacts['recipeLocation'];
    recipeLocation = recipeLocation.substring(7);
    let planet;

    for(let i = 1; i <= 7; i++){
        if(i === recipeLocation) 
            planet= new Pentium(artifacts['planet' + i],i,true)
        else
            planet= new Pentium(artifacts['planet' + i],i,false)
        map.set(artifacts['planet' + i],planet);
    }
    
    let meteor= new MeteorStorm();
    map.set(artifacts['astroidField'], meteor);
    let celeron = new Celeron();
    map.set(artifacts['celeron'], celeron);
    let ryzen= new Ryzen();
    map.set(artifacts['ryzen'], ryzen);
    let xeon = new Xeon();
    map.set(artifacts['xeon'], xeon);
    return map;
}
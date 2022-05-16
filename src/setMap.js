let oldSpiceMap;
function setMap(){
    retrieveMap = localStorage.getItem('oldSpiceMap');
    oldSpiceMap = JSON.parse(retrieveMap);
    
    if(oldSpiceMap == null)
        return setRandMap();
    return setStoredMap();
}
function randomPlacement(){
    let artifacts = {};
    let x;
    let y;
    let setCoordinates= () =>{
        let position = new Object;
        let x = Math.floor(Math.random() * 128);
        let y = Math.floor(Math.random() * 128);
        position['x'] = x;
        position['y'] = y;
        return position;
    }
    for(let i = 1; i <= 7; i++){
        artifacts["planet" + i] = setCoordinates();
    }
    artifacts["astroidField"] = setCoordinates()
    artifacts["SpaceStation1"] = setCoordinates();
    artifacts["SpaceStation2"] = setCoordinates();
    return artifacts;

}
function setRandMap(){
    console.log('set random')
    let map = new Map;

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
    let map = new Map;

    let recipeLocation = parseInt(artifacts['recipeLocation']);
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
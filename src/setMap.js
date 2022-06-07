let oldSpiceMap;
/**
 * retrieves map settings from local storage
 * @return {Map} returns map object with new settings
 */
function setMap() {
  retrieveMap = localStorage.getItem("oldSpiceMap");
  oldSpiceMap = JSON.parse(retrieveMap);

  if (oldSpiceMap == null) return setRandMap();
  return setStoredMap();
}
/**
 * sets random map
 * @return {Map} returns map object with random settings
 */
function setRandMap() {
  console.log(`generating random map`);
  const map = new Map();
  const recipeLocation = Math.ceil(Math.random() * 7);

  map.set(new Vector(0,0), new Eniac()) // first so the space wont be taken by something else
  map.replaceRandomEmptyCell(new MeteorStorm());
  map.replaceRandomEmptyCell(new Celeron());
  map.replaceRandomEmptyCell(new Ryzen())
  map.replaceRandomEmptyCell(new Xeon())

  for (let i = 1; i <= 7; i++) {
    map.replaceRandomEmptyCell(new Pentium(i, i === recipeLocation));
  }

  for(let n = 0; n <= 10; n++) {
    map.replaceRandomEmptyCell(new AbandonedFreighter(Math.floor(Math.random() * 100) + 1, Math.floor(Math.random() * 500) + 1))
  }

  return map;
}
/**
 * sets stored map
 * @return {Map} returns map object with stored settings
 */
function setStoredMap() {
  artifacts = oldSpiceMap;
  let map = new Map();

  let recipeLocation = artifacts["recipeLocation"];
  recipeLocation = recipeLocation.substring(7);
  let planet;

  for (let i = 1; i <= 7; i++) {
    if (i === recipeLocation)
      planet = new Pentium(artifacts["planet" + i], i, true);
    else planet = new Pentium(artifacts["planet" + i], i, false);
    map.set(artifacts["planet" + i], planet);
  }

  let meteor = new MeteorStorm();
  map.set(artifacts["astroidField"], meteor);
  let celeron = new Celeron();
  map.set(artifacts["celeron"], celeron);
  let ryzen = new Ryzen();
  map.set(artifacts["ryzen"], ryzen);
  let xeon = new Xeon();
  map.set(artifacts["xeon"], xeon);
  return map;
}

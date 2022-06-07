function save_game() {
  try {
    play = player;
    let position = player.position;
    let username = document.getElementById("saveUsername");
    let name = username.value;

    let player_save = {};

    player_save["username"] = name;
    player_save["startingPositionX"] = position.x;
    player_save["startingPositionY"] = position.y;
    player_save["startingEnergy"] = player.energy;
    player_save["startingSupplies"] = player.supplies;
    player_save["startingCredits"] = player.credits;
    player_save["immortal"] = immortal;
    map = player.map;
    player_save["map"] = map;
    player_save["mapSize"] = map.size;
    console.log(player_save);
    localStorage.setItem("user_" + name, JSON.stringify(player_save));
    retrievePlayer = localStorage.getItem("user_" + name);
    load = JSON.parse(retrievePlayer);
    console.log("load", load);
  } catch (error) {
    console.log(error);
  }
}
function load_game() {
  let username = document.getElementById("loadUsername");
  let name = username.value;
  retrievePlayer = localStorage.getItem("user_" + name);
  load = JSON.parse(retrievePlayer);
  console.log("load player", load);
  let mapCells = load.map.cells;
  let mapSize = load.map.size;
  let map = new Map(mapSize, mapCells);
  let startPosition = new Vector(
    parseInt(load.startingPositionX),
    parseInt(load.startingPositionY)
  );
  console.log(load.startingCredits);

  let player = new Player(
    startPosition,
    parseInt(load.startingEnergy),
    1000,
    parseInt(load.startingSupplies),
    parseInt(load.startingCredits),
    new Map()
  );
  /*
  try {
    player.energy = parseInt(load.startingEnergy);
    player.credits = parseInt(load.startingCredits);
    player.position = startPosition;
    player.supplies = parseInt(load.startingSupplies);
    console.log(load.startingCredits);
    player.map = map;
  } catch (error) {
    console.log(error);
  }
  */
  // render();

  return false;
}

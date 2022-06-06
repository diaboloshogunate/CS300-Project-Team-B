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
    cells = map.cells;
    cellArray = [];
    for (let i = 0; i < cells.length; i++) {
      let array = cells[i];
      for (var j = 0; j < array.length; j++) {
        if (!array[j].isHidden) {
          cellArray.push({ cellInfo: array[j], x: i, y: j });
        }
        if (array[j].backgroundColor !== "#000") {
          cellArray.push({ cellInfo: array[j], x: i, y: j });
        }
      }
    }
    player_save["mapSize"] = map.size;
    player_save["visibleCells"] = cellArray;
    localStorage.setItem("user_" + name, JSON.stringify(player_save));
    retrievePlayer = localStorage.getItem("user_" + name);
    loadPlayer = JSON.parse(retrievePlayer);
    console.log("load player", loadPlayer);
  } catch (error) {
    console.log(error);
  }
}

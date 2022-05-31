const MaxCoord = findMax();
const adminPanel = document.getElementById('admin_form')
let isAdminPanelOpen = false;

function findMax() {
  /*
  if (eastLimit < northLimit) return eastLimit;
  else return northLimit;
  */
  return mapSize;
}
/*
//create random artifact placement
function randomPlacement() {
  let artList = {};
  for (let i = 1; i <= 7; i++) {
    x = Math.floor(Math.random() * MaxCoord);
    y = Math.floor(Math.random() * MaxCoord);
    artList["planet" + i] = setCoordinates(x, y);
  }
  return artList;
}
*/
function admin_init() {
  if (isAdminPanelOpen === true) {
    return;
  }

  document.getElementById("admin_form").removeAttribute('style');
  console.log("hello");
  console.log(startingEnergy);
  isAdminPanelOpen = true;
}

function onCancelAdminInit(e) {
  console.log(e)
  e.preventDefault();
  console.log("cancel");
  isAdminPanelOpen = false;
  document.getElementById("admin_form").setAttribute('style', 'display:none');
  return false;
}

//Get values from artifacts form. Map each artifact to
//vector coordinates in artifacts object
function setArtifacts() {
  console.log(adminPanel.elements['admin_pw'].value)
  let check = document.getElementById("admin_pw").value;
  if (check !== "password123") {
    alert("Incorrect password");
    return false;
  } else {
    let artifacts = {};
    let x;
    let y;
    let badInput = false;
    let validInput = (x) => {
      if (x > MaxCoord || y > MaxCoord) badInput = true;
      if (x < 0 || y < 0) badInput = true;
    };
    try {
      for (let i = 1; i <= 7; i++) {
        x = document.querySelector("#p" + i + "-x").value;
        y = document.querySelector("#p" + i + "-y").value;
        validInput(x, y);
        artifacts["planet" + i] = setCoordinates(x, y);
      }
      x = document.querySelector("#af1-x").value;
      y = document.querySelector("#af1-y").value;
      validInput(x, y);
      artifacts["astroidField"] = setCoordinates(x, y);
      x = document.querySelector("#ss1-x").value;
      y = document.querySelector("#ss1-y").value;
      validInput(x, y);
      artifacts["celeron"] = setCoordinates(x, y);
      x = document.querySelector("#ss2-x").value;
      y = document.querySelector("#ss2-y").value;
      validInput(x, y);
      artifacts["ryzen"] = setCoordinates(x, y);
      x = document.querySelector("#ss3-x").value;
      y = document.querySelector("#ss3-y").value;
      validInput(x, y);
      artifacts["xeon"] = setCoordinates(x, y);

      let recipe_select = document.getElementById("inputGroupSelect01");
      artifacts["recipeLocation"] =
        recipe_select.options[recipe_select.selectedIndex].text;
    } catch {
      console.error(error);
    }
    //Store new artifact placement in local storage
    let storeString = JSON.stringify(artifacts);
    console.log(storeString);
    let testing = JSON.parse(storeString);
    console.log(testing);
    localStorage.setItem("oldSpiceMap", JSON.stringify(artifacts));
    console.log(JSON.stringify(artifacts));
    let test = localStorage.getItem("oldSpiceMap");

    console.log(test);
    isAdminPanelOpen = false;
    if (badInput) {
      alert("Error. Inputs must be between 0 and " + MaxCoord);
      return false;
    } else {
      document.getElementById("admin_form").remove();
      alert("Reload page to finish artifact placement update");
    }
  }
}
function setCoordinates(cordx, cordy) {
  let position = new Object();
  let x = parseInt(cordx);
  let y = parseInt(cordy);
  if (isNaN(x)) x = Math.floor(Math.random() * MaxCoord);
  if (isNaN(y)) y = Math.floor(Math.random() * MaxCoord);
  position["x"] = x;
  position["y"] = y;

  return position;
}

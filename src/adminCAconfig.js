let body = document.body;
function findMax() {
  if (eastLimit < northLimit) return eastLimit;
  else return northLimit;
}

const MaxCoord = findMax();
let btnPush = false;

document.getElementById("btn_admin").style.marginTop = "10px";
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

//create form for artifact placement
function admin_init() {
  if (btnPush === true) {
    return;
  }
  console.log(startingEnergy);
  btnPush = true;
  //form
  console.log("hello");
  let form = document.createElement("form");
  form.style.zIndex = "1";
  form.setAttribute("onSubmit", "return setArtifacts();");
  form.setAttribute("id", "admin_form");
  form.style.border = "2px solid black";
  form.style.margin = "10px 10px";
  form.style.width = "320px";
  form.style.display = "flex";
  form.style.flexDirection = "column";
  form.style.padding = "10px";
  console.log(form);
  body.append(form);
  let h1 = document.createElement("h1");
  h1.textContent = "Artifact Placement";
  h1.style.textAlign = "center";

  form.append(h1);
  let div_body = document.createElement("div");
  div_body.style.display = "flex";
  div_body.style.flexDirection = "column";
  div_body.style.padding = "50px";
  form.append(div_body);
  //planets input
  for (let i = 1; i <= 7; i++) {
    const element = document.createElement("div");
    element.className = "row";
    element.style.display = "flex";
    element.style.justifyContent = "right";
    div_body.append(element);
    let label = document.createElement("label");
    label.setAttribute("for", "planet" + i);
    label.textContent = "Pentium " + i;
    label.style.margin = " 4px auto";
    element.append(label);
    let input1 = document.createElement("input");
    input1.setAttribute("type", "number");
    input1.setAttribute("id", "p" + i + "-x");
    input1.setAttribute("size", "1");
    input1.style.width = "3rem";
    element.append(input1);
    let span = document.createElement("span");
    let comma = document.createTextNode(",");
    span.appendChild(comma);
    element.append(span);
    let input2 = document.createElement("input");
    input2.setAttribute("type", "number");
    input2.setAttribute("id", "p" + i + "-y");
    input2.setAttribute("size", "1");
    input2.style.width = "3rem";
    input2.className = "col";
    element.append(input2);
  }
  //Astroid field input
  const element = document.createElement("div");
  element.style.display = "flex";
  element.style.justifyContent = "right";
  div_body.append(element);
  let label = document.createElement("label");
  label.setAttribute("for", "astroid_field");
  label.textContent = "Astroid Field";
  label.style.margin = " 4px auto";
  element.append(label);
  let input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("id", "af1-x");
  input1.setAttribute("size", "1");
  input1.style.width = "3rem";
  element.append(input1);
  let span = document.createElement("span");
  let comma = document.createTextNode(",");
  span.appendChild(comma);
  element.append(span);
  let input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.setAttribute("id", "af1-y");
  input2.setAttribute("size", "1");
  input2.style.width = "3rem";
  element.append(input2);
  let specialPlanets = ["Celeron", "Ryzen", "Xeon"];
  //Space stations input
  for (let i = 1; i <= 3; i++) {
    const element = document.createElement("div");
    element.style.display = "flex";
    element.style.justifyContent = "right";
    div_body.append(element);
    let label = document.createElement("label");
    label.setAttribute("for", "special_planet" + i);
    label.textContent = specialPlanets[i - 1];
    label.style.margin = " 4px auto";
    element.append(label);
    let input1 = document.createElement("input");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", "ss" + i + "-x");
    input1.setAttribute("size", "1");
    input1.style.width = "3rem";
    element.append(input1);
    let span = document.createElement("span");
    let comma = document.createTextNode(",");
    span.appendChild(comma);
    element.append(span);
    let input2 = document.createElement("input");
    input2.setAttribute("type", "text");
    input2.setAttribute("id", "ss" + i + "-y");
    input2.setAttribute("size", "1");
    input2.style.width = "3rem";
    element.append(input2);
  }
  //recipe option dropdown
  let adiv = document.createElement("div");
  adiv.style.display = "flex";
  adiv.style.justifyContent = "center";
  adiv.style.margin = "6px 0";
  let group_div = document.createElement("div");
  group_div.className = "p";
  let pre_div = document.createElement("div");
  pre_div.className = "l";
  let group_label = document.createElement("label");
  let recipe = document.createTextNode("Recipe Location");
  group_label.appendChild(recipe);
  group_label.setAttribute("for", "inputGroupSelect01");
  pre_div.append(group_label);
  group_div.append(pre_div);
  let select1 = document.createElement("select");
  select1.setAttribute("id", "inputGroupSelect01");
  select1.className = "u";
  group_div.append(select1);
  adiv.append(group_div);
  div_body.append(adiv);
  for (let i = 1; i <= 7; i++) {
    let element = document.createElement("option");
    element.setAttribute("value", i);
    let text = document.createTextNode("Pentium " + i);
    element.appendChild(text);
    select1.append(element);
  }
  //Submit and reset buttons
  let div = document.createElement("div");
  div.style.marginTop = "10px";
  let submit = document.createElement("input");
  let reset = document.createElement("input");
  let psswrd = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Submit");
  reset.setAttribute("type", "submit");
  reset.setAttribute("value", "Cancel");
  psswrd.setAttribute("type", "password");
  psswrd.setAttribute("id", "admin_pw");

  let pw_label = document.createTextNode("Password");
  div.append(pw_label);
  div.append(psswrd);
  div.append(submit);
  div.append(reset);
  div_body.append(div);
  reset.onclick = function (e) {
    e.preventDefault();
    console.log("cancel");
    btnPush = false;
    document.getElementById("admin_form").remove();
    return false;
  };
}

//Get values from artifacts form. Map each artifact to
//vector coordinates in artifacts object
function setArtifacts() {
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
    btnPush = false;
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

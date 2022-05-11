let body = document.body;
const MaxCoord = 128;

//create form for artifact placement
function admin_init(){
    //form
    console.log('hello');
    let form = document.createElement('form');
    form.style.zIndex = "1";
    form.setAttribute("class","card p-3 w-50 my-10 mx-auto bg-light shadow fixed-top");
    form.setAttribute("onSubmit","setArtifacts()");
    form.setAttribute("id","admin_form");
    body.append(form);
    let h1= document.createElement('h1');
    h1.setAttribute("class", "card-title mx-auto");
    let h1_content = document.createTextNode('Artifact Placement');
    h1.appendChild(h1_content);
    form.append(h1);
    let div_body = document.createElement('div');
    div_body.setAttribute("class", "card-body mx-auto");
    let formContain = document.createElement('div')
    form.append(div_body);
    //planets input
    for (let i = 1; i<= 7; i++) {
        const element = document.createElement('div');
        element.setAttribute("class", "m-1");
        div_body.append(element);
        let label = document.createElement('label');
        label.setAttribute("class","mx-3");
        label.setAttribute("for", "planet" + i);
        let planet = document.createTextNode("Planet " + i);
        label.appendChild(planet);
        element.append(label);
        let input1 = document.createElement('input');
        input1.setAttribute("type", "text");
        input1.setAttribute("id", "p" + i + "-x");
        input1.setAttribute("size", "1");
        element.append(input1);
        let span = document.createElement('span');
        let comma = document.createTextNode(",");
        span.appendChild(comma);
        element.append(span);
        let input2 = document.createElement('input');
        input2.setAttribute("type", "text");
        input2.setAttribute("id", "p" + i + "-y");
        input2.setAttribute("size", "1");
        element.append(input2);
    }
    //recipe option dropdown
    let group_div = document.createElement('div');
    let pre_div = document.createElement('div');
    let group_label = document.createElement('label');
    let recipe = document.createTextNode("Recipe Location");
    group_label.appendChild(recipe);
    group_div.setAttribute("class", "input-group mb-4");
    pre_div.setAttribute("class", "input-group-prepend");
    group_label.setAttribute("class", "input-group-text")
    group_label.setAttribute("for", "inputGroupSelect01");
    pre_div.append(group_label);
    group_div.append(pre_div);
    let select1 = document.createElement('select');
    select1.setAttribute("class", "custom-select")
    select1.setAttribute("id", "inputGroupSelect01")
    group_div.append(select1);
    div_body.append(group_div);
    for(let i = 1; i<=7; i++){
        let element = document.createElement('option');
        element.setAttribute("value", i);
        let text = document.createTextNode("Planet " + i);
        element.appendChild(text);
        select1.append(element);
    }
    //Astroid field input
    const element = document.createElement('div');
    element.setAttribute("class", "m-1");
    div_body.append(element);
    let label = document.createElement('label');
    label.setAttribute("class","mx-3");
    label.setAttribute("for", "astroid_field");
    let astField = document.createTextNode("Astroid Field");
    label.appendChild(astField);
    element.append(label);
    let input1 = document.createElement('input');
    input1.setAttribute("type", "text");
    input1.setAttribute("id", "af1-x");
    input1.setAttribute("size", "1");
    element.append(input1);
    let span = document.createElement('span');
    let comma = document.createTextNode(",");
    span.appendChild(comma);
    element.append(span);
    let input2 = document.createElement('input');
    input2.setAttribute("type", "text");
    input2.setAttribute("id", "af1-y");
    input2.setAttribute("size", "1");
    element.append(input2)
    //Space stations input
    for (let i = 1; i<= 2; i++) {
        const element = document.createElement('div');
        element.setAttribute("class", "m-1");
        div_body.append(element);
        let label = document.createElement('label');
        label.setAttribute("class","mx-1");
        label.setAttribute("for", "space_station" + i);
        let planet = document.createTextNode("Space Station " + i);
        label.appendChild(planet);
        element.append(label);
        let input1 = document.createElement('input');
        input1.setAttribute("type", "text");
        input1.setAttribute("id", "ss" + i + "-x");
        input1.setAttribute("size", "1");
        element.append(input1);
        let span = document.createElement('span');
        let comma = document.createTextNode(",");
        span.appendChild(comma);
        element.append(span);
        let input2 = document.createElement('input');
        input2.setAttribute("type", "text");
        input2.setAttribute("id", "ss" + i + "-y");
        input2.setAttribute("size", "1");
        element.append(input2);

    }
    //Submit and reset buttons
    let div = document.createElement('div')
    div.setAttribute("class", "row my-3 mx-2");
    let submit = document.createElement('input');
    let reset = document.createElement('input');
    submit.setAttribute("class", "btn btn-primary btn-md col-6 border-light");
    submit.setAttribute('type', "submit");
    submit.setAttribute('value', "Submit");
    reset.setAttribute("class", "btn btn-secondary btn-md col-6 border-light");
    reset.setAttribute('type', "reset");
    reset.setAttribute('value', "Reset");
    div.append(submit);
    div.append(reset);
    div_body.append(div);
}

//Get values from artifacts form. Map each artifact to 
//vector coordinates in artifacts object
function setArtifacts(){
    let artifacts = {};
    let x;
    let y;

    x = document.querySelector("#p1-x").value;
    y = document.querySelector("#p1-y").value;
    console.log('x ' + x + ' y ' + y);
    try{
    for(let i = 1; i <= 7; i++){
    x = document.querySelector("#p" + i + "-x").value;
    y = document.querySelector("#p" + i + "-y").value;
    artifacts["planet" + i] = new Vector(parseInt(x),parseInt(y));

    }
    x = document.querySelector("#af1-x").value;
    y = document.querySelector("#af1-y").value;
    artifacts["astroidField"] = new Vector(parseInt(x),parseInt(y));
    x = document.querySelector("#ss1-x").value;
    y = document.querySelector("#ss1-y").value;
    artifacts["SpaceStation1"] = new Vector(parseInt(x),parseInt(y));
    x = document.querySelector("#ss2-x").value;
    y = document.querySelector("#ss2-y").value;
    artifacts["SpaceStation2"] = new Vector(parseInt(x),parseInt(y));
    }catch{
        console.error("ex catch");

    }
    console.log(artifacts);
    document.getElementById("admin_form").remove();


}
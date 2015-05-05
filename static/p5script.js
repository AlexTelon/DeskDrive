var rSlider, gSlider, bSlider;
var drawActive = false;
var brushR = 30;

function setup() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    createCanvas(w, h);

    noStroke();
    input = createInput();
    input.position(w / 3 + 20, 65);

    button = createButton('submit');
    button.position(w / 3 + 150, 65);
    button.mousePressed(test);

    label = createElement('h1', 'go to/create project');
    label.position(w / 3 + 20, 5);

    textAlign(CENTER);
    textSize(50);

    // create sliders
    rSlider = createSlider(0, 255, 100);
    rSlider.position(20, 20);
    gSlider = createSlider(0, 255, 0);
    gSlider.position(20, 50);
    bSlider = createSlider(0, 255, 255);
    bSlider.position(20, 80);
    // create button to draw
    button = createButton('drawActive');
    button.position(30, 100);
    button.mouseClicked(function() {
        if (drawActive)
            drawActive = false;
        else
            drawActive = true;
    });
}

function test() {
    var name = input.value();
    label.html(name);
    input.value('');
}

function draw() {
    if (mouseIsPressed && drawActive) {
        console.log("derp");
        fill(255, 0, 0);
        ellipse(mouseX, mouseY, brushR, brushR);
    } else {

    }

    var r = rSlider.value();
    var g = gSlider.value();
    var b = bSlider.value();
    //fill(r,g,b)
    fill(r, g, b);
    text("red", 165, 35);
    text("green", 165, 65);
    text("blue", 165, 95);
}
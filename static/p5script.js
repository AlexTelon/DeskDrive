var rSlider, gSlider, bSlider;
var drawActive = false;
var brushR = 30;
var r,g,b;
var bgColor = "rgb(255,204,100)";
var cv;

function setup() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    cv = createCanvas(w, h);
    console.log(cv)
    background(bgColor);

    stroke();

    // create sliders
    rSlider = createSlider(0, 255, 100);
    rSlider.position(20, 20);
    gSlider = createSlider(0, 255, 0);
    gSlider.position(20, 50);
    bSlider = createSlider(0, 255, 255);
    bSlider.position(20, 80);

    // create button to draw
    button = createButton('drawActive');
    button.position(30, 120);
    button.mouseClicked(function() {
        if (drawActive)
            drawActive = false;
        else
            drawActive = true;
    });

    // create button to draw
    button = createButton('Clear');
    button.position(140, 120);
    button.mouseClicked(function() {
        clearBg();
    });
}

// clear all
function clearBg() {
    console.log("before clear: ", cv);
    background(bgColor);
}

function test() {
    var name = input.value();
    label.html(name);
    input.value('');
}

function draw() {
    r = rSlider.value();
    g = gSlider.value();
    b = bSlider.value();
    if (mouseIsPressed && drawActive) {
        fill(r, g, b);
        ellipse(mouseX, mouseY, brushR, brushR);
    } else {

    }


    //fill(r,g,b)
    fill(r, g, b);
    text("red", 165, 35);
    text("green", 165, 65);
    text("blue", 165, 95);
}

/**
 * Returns the whole canvas so it can be saved and reused later
 * @returns {*}
 */
function getCanvas() {
    return cv;
}
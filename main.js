var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = ctx.canvas.width = window.innerWidth;
var height = ctx.canvas.height = window.innerHeight;

var cols = 120, rows = 120;
var tileSize = 50;

var xOff = width / 2, yOff = 50;

// mouse coords
var mouseX, mouseY;

// listeners
document.onmousemove = updateMousePos;
document.onmousedown = logCoords;
document.onkeypress = processKeys;

// FPS
const filterStrength = 20;
var frameTime = 0, lastLoop = new Date(), thisLoop, thisFrameTime;

// main code
/* ------------------------------------------------------------------------ */

// game objects
var grid = new Grid(rows, cols);
var camera = new Camera(xOff, yOff);

// transform matrix for isometric view
startGame();

// check FPS
//setInterval(() => console.log("FPS: " + Math.floor(1000 / frameTime)));

/* ------------------------------------------------------------------------ */

// game loop
function startGame() {
    setInterval(loop, 0);
}

function loop() {
    // clear canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // adjust camera
    ctx.setTransform(1, .5, -1, .5, camera.pos.x, camera.pos.y);

    // check FPS
    thisFrameTime = (thisLoop = new Date()) - lastLoop;
    frameTime += (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;

    // update selected tile
    grid.selectedTile = mouseToTileCoords();

    // draw
    grid.draw();
}

function updateMousePos(event) {
    mouseX = event.clientX,
    mouseY = event.clientY;
}

/* util functions */
function DOMToMathMatrix(dMatrix) {
    var a = dMatrix.a,
    b = dMatrix.b,
    c = dMatrix.c,
    d = dMatrix.d,
    e = dMatrix.e,
    f = dMatrix.f;
    return math.matrix([[a, c, e], [b, d, f], [0, 0, 1]]);
}

function mouseToTileCoords() {
    var isValid;
    try {
        var tMatrix = DOMToMathMatrix(ctx.getTransform());
        tMatrix = math.inv(tMatrix);
        var mcMatrix = math.matrix([[mouseX], [mouseY], [1]]);
        var isometricCoords = math.multiply(tMatrix, mcMatrix);
        var i = Math.floor(isometricCoords.get([0, 0]) / tileSize);
        var j = Math.floor(isometricCoords.get([1, 0]) / tileSize);

        // check if i and j are valid
        isValid = (i >= 0 && i < cols) && (j >= 0 && j < rows);
    } catch(e) {}

    return isValid ? {i, j} : null;
}

function logCoords(event) {
    console.log(mouseToTileCoords());
}
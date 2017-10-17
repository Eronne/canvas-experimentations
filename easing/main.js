var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var raf;
var mousePos;

var now = Date.now();
var lastTime = now;
var deltaTime = 16;
var currentTime = 0;

var planeSavedX,
    planeSavedY;


var plane = {
    color: '#ecf0f1',
    x: canvas.width / 2 -50,
    y: canvas.height / 2 + 50,
    draw: function() {
        ctx.beginPath()
        ctx.strokeStyle = '#ecf0f1'
        ctx.fillStyle = '#ecf0f1'

        ctx.moveTo( plane.x - 50, plane.y + 50 )
        ctx.lineTo( plane.x, plane.y - 50 )
        ctx.lineTo( plane.x + 50, plane.y + 50 )
        ctx.lineTo( plane.x - 50, plane.y + 50 )
    
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }
};

function getMousePosition (canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

function init() {
    canvas.addEventListener("click",function(e){
        mousePos = getMousePosition(canvas, e);

        planeSavedX = plane.x;
        planeSavedY = plane.y;
        console.log(mousePos, planeSavedX, planeSavedY)
        tween();
    });

    update();
};

function update() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    plane.draw();

    requestAnimationFrame(update)
};

function tween() {
    raf = window.requestAnimationFrame(tween);    
    now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    currentTime += deltaTime;
    var duration = 1000;

    if (currentTime < duration) {
        plane.x = Easing.easeInOutQuad(currentTime, planeSavedX, mousePos.x - planeSavedX, duration)
        plane.y = Easing.easeInOutQuad(currentTime, planeSavedY, mousePos.y - planeSavedY, duration)
        // console.log(currentTime, planeSavedX, mousePos.x - planeSavedX, duration)
    } else {
        cancelAnimationFrame(raf);
        currentTime = 0;
    }
}

init();
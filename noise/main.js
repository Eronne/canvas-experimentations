var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var nbPoints = 35;
var angle = 0;
var radius = 120;
var points = [];
var increase = Math.PI * 2 / nbPoints;
var simplex = new SimplexNoise();
var time = 0;


function init() {

    for(var i = 0; i < nbPoints; i++) {
        var point = {
            color: '#ecf0f1',
            x: radius * Math.cos( angle ) + canvas.width / 2,
            y: radius * Math.sin( angle ) + canvas.height / 2,
            draw: function() {
                ctx.beginPath();
                ctx.strokeStyle = '#ffffff';
                ctx.arc( this.x, this.y, 2, 0, Math.PI * 2, true );
                ctx.stroke();
                ctx.closePath();
            }
        };
        angle += increase;
        points.push(point);
    }

    update();
};

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach(function (point) {
        point.draw();
    }, this);
    requestAnimationFrame(update)
};

init();
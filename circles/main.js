var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var x = canvas.width;
var y = canvas.height;
var raf;

var ballNumber = 10;
var balls = [];

for(var i = 0; i < ballNumber; i++) {
    var randomBallPositionX = Math.floor(Math.random() * (x - 0)) + 0;
    var randomBallPositionY = Math.floor(Math.random() * (x - 0)) + 0;
    var randomBallDirectionX = Math.floor(Math.random() * (5 - (-5)) + (-5));
    var randomBallDirectionY = Math.floor(Math.random() * (5 - (-5)) + (-5));
    var ball = {
        x: randomBallPositionX,
        y: randomBallPositionY,
        vx: randomBallDirectionX,
        vy: randomBallDirectionY,
        radius: 10,
        color: '#ecf0f1',
        draw: function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    };
    balls.push(ball)    
}

(function update() {

    balls.forEach(function(ball) {
        ball.draw();
        ball.x += ball.vx;
        ball.y += ball.vy;
        if (ball.y + ball.vy > y || ball.y + ball.vy < 0) {
            ball.vy = -ball.vy;
        }
        if (ball.x + ball.vx > x || ball.x + ball.vx < 0) {
            ball.vx = -ball.vx
        }
    }, this);
    raf = window.requestAnimationFrame(update);
})();
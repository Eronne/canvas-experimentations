var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var x = canvas.width;
var y = canvas.height;
var raf;

var ballNumber = 200;
var balls = [];

for(var i = 0; i < ballNumber; i++) {
    var randomBallPositionX = Math.floor(Math.random() * (x - 0)) + 0;
    var randomBallPositionY = Math.floor(Math.random() * (x - 0)) + 0;
    var randomBallDirectionX = Math.floor(Math.random() * (3 - (-3)) + (-3));
    var randomBallDirectionY = Math.floor(Math.random() * (3 - (-3)) + (-3));
    var ball = {
        x: randomBallPositionX,
        y: randomBallPositionY,
        vx: randomBallDirectionX,
        vy: randomBallDirectionY,
        radius: 2,
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
    ctx.clearRect(0, 0, x, y)
    
    balls.forEach(function(ball) {
        ball.draw();
        ball.x += ball.vx;
        ball.y += ball.vy;

        for(var i = 0; i < balls.length; i++) {
            var otherBall = balls[i];
            
            var a = otherBall.x - ball.x;
            var b = otherBall.y - ball.y;
            var distance = Math.sqrt(a*a + b*b);

            if (distance < 100) {
                var opacity = (distance / 100)
                ctx.globalAlpha = 1-opacity.toFixed(2);
                
                ctx.beginPath();
                ctx.moveTo(ball.x, ball.y);
                ctx.lineTo(otherBall.x, otherBall.y);
                ctx.strokeStyle = 'rgb(236, 240, 241)' 
                ctx.closePath();
                ctx.stroke();
            }
            
        }

        if (ball.y + ball.vy > y || ball.y + ball.vy < 0) {
            ball.vy = -ball.vy;
        }
        if (ball.x + ball.vx > x || ball.x + ball.vx < 0) {
            ball.vx = -ball.vx
        }
    }, this);
    raf = window.requestAnimationFrame(update);
})();
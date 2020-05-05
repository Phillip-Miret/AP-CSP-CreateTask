const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth - 20;
// canvas.height = window.innerHeight - 20;

canvas.width = 1240;
canvas.height = 740;

let c1 = new circle(canvas.width/2, canvas.height/2, 20, 0, 0);
let gravity = -0.5;



setInterval(draw, 20);

function circle(x, y , radius, dx, dy){
   this.x = x;
   this.y = y;
   this.radius = radius;
   this.dx = dx;
   this.dy = dy;
}



function drawCircle(circle){
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2, true);
    ctx.fill();
    if (circle.x + circle.radius >= canvas.width || circle.x - circle.radius <= 0)
        circle.dx *= -1;
    if (circle.y + circle.radius >= canvas.height || circle.y - circle.radius <= 0){
        circle.dy *= -1;
    } 
    circle.dy -= gravity;
    circle.x += circle.dx;
    circle.y += circle.dy;
   
    

    

}

function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawCircle(c1);

}




 
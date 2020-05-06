const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth - 20;
// canvas.height = window.innerHeight - 20;

canvas.width = 1240;
canvas.height = 700;

let numCircs = new Number();
let circles = new Array[numCircs];
let gravity = -0.5;



setInterval(draw, 20);

function circle(x, y , radius, dx, dy){
   this.x = x;
   this.y = y;
   this.radius = radius;
   this.dx = dx;
   this.dy = dy;
}

function getInput(){
    let input = document.getElementById("numInput").value;
   console.log(input);
   let inputNum = input.match(/\d+/g);
   inputNum = parseInt(inputNum[0]);
   numCircs = inputNum;
}


function drawCircle(circle){
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2, true);
    ctx.fill();
    if (circle.x + circle.radius >= canvas.width || circle.x - circle.radius <= 0)
        circle.dx *= -1;
    if (circle.y + circle.radius >= canvas.height){ 
        circle. y = canvas.height - circle.radius;
        circle.dy *= -1;
        circle.dy += gravity;      
    } 
    circle.dy -= gravity;
    circle.x += circle.dx;
    circle.y += circle.dy;
   
    

    

}

function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawCircle(c1);

}




 
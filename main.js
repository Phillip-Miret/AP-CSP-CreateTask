const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth - 20;
// canvas.height = window.innerHeight - 20;

canvas.width = 1240;
canvas.height = 700;

let numCircs = new Number();
numCircs = 1000;
let circles = new Array(numCircs);
let maxSpeed = 5;
let normRadius = 5;
let gravity = 0;

fillCircArr(circles);

setInterval(draw, 20);



function circle(x, y , radius, dx, dy, infected, immune){
   this.x = x;
   this.y = y;
   this.radius = radius;
   this.dx = dx;
   this.dy = dy;
   this.infected = false;
   this.immune = false;
}

function getInput(){
    let input = document.getElementById("numInput").value;
   console.log(input);
   let inputNum = input.match(/\d+/g);
   inputNum = parseInt(inputNum[0]);
   numCircs = inputNum;
}

function fillCircArr(cirArr){
  for(let i = 0; i< cirArr.length; i++){
      cirArr[i] = new circle(Math.random()*canvas.width, 
      Math.random()*canvas.height, 
      normRadius, 
      Math.random()*maxSpeed*2-maxSpeed, 
      Math.random()*maxSpeed*2-maxSpeed);
      
    };
}

function drawManyCircles(cirArr){
    for(let i = 0; i< cirArr.length; i++){
        ctx.beginPath();
        ctx.arc(cirArr[i].x, cirArr[i].y, cirArr[i].radius, 0, Math.PI*2, true);
        ctx.fill(); 
        if (cirArr[i].x + cirArr[i].radius >= canvas.width || cirArr[i].x - cirArr[i].radius <= 0)
        cirArr[i].dx *= -1;
    if (cirArr[i].y + cirArr[i].radius >= canvas.height){ 
        cirArr[i]. y = canvas.height - cirArr[i].radius;
        cirArr[i].dy *= -1;
        cirArr[i].dy += gravity;      
    } 
    if(cirArr[i].y <= 0){
        cirArr[i].dy *= -1;
    }
    cirArr[i].dy -= gravity;
    cirArr[i].x += cirArr[i].dx;
    cirArr[i].y += cirArr[i].dy;
    }
}


function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawManyCircles(circles);

}




 
const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth - 20;
// canvas.height = window.innerHeight - 20;

canvas.width = 1240;
canvas.height = 700;

let numCircs = new Number();
numCircs = 20;
let circles = new Array(numCircs);
let maxSpeed = 5;
let normRadius = 10;
//let gravity = 0;
let chanceOfInfec = 0.1;
let deathRate = 0.05;
let timeTillHeal = 500;

fillCircArr(circles);

setInterval(draw, 20);



function circle(x, y , radius, dx, dy, infected, immune, dead, timeTillHeal){
   this.x = x;
   this.y = y;
   this.radius = radius;
   this.dx = dx;
   this.dy = dy;
   this.infected = infected;
   this.immune = immune;
    this.dead = dead;
    this.timeTillHeal = timeTillHeal;
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
      if(i === 0){
        cirArr[i] = new circle(Math.random()*canvas.width, 
        Math.random()*canvas.height, 
        normRadius, 
        Math.random()*maxSpeed*2-maxSpeed, 
        Math.random()*maxSpeed*2-maxSpeed,
        true,
        false,
        false,
        timeTillHeal);
      } else{
      cirArr[i] = new circle(Math.random()*canvas.width, 
      Math.random()*canvas.height, 
      normRadius, 
      Math.random()*maxSpeed*2-maxSpeed, 
      Math.random()*maxSpeed*2-maxSpeed,
      false,
      false,
      false,
      timeTillHeal);
      }
    }
}

function drawManyCircles(cirArr){
    for(let i = 0; i< cirArr.length; i++){
        if(cirArr[i].immune){
            ctx.beginPath();
            ctx.fillStyle = "yellow";
            ctx.arc(cirArr[i].x, cirArr[i].y, cirArr[i].radius, 0, Math.PI*2, true);
            ctx.fill(); 
            ctx.closePath();
        }else if(cirArr[i].infected){
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.arc(cirArr[i].x, cirArr[i].y, cirArr[i].radius, 0, Math.PI*2, true);
            ctx.fill(); 
            ctx.closePath();
        } else {
        ctx.beginPath();
        ctx.fillStyle = "black";          
        ctx.arc(cirArr[i].x, cirArr[i].y, cirArr[i].radius, 0, Math.PI*2, true);
        ctx.fill(); 
        ctx.closePath(); 
    }
        if (cirArr[i].x + cirArr[i].radius >= canvas.width || cirArr[i].x - cirArr[i].radius <= 0){
            cirArr[i].dx *= -1;

        }
        
    if (cirArr[i].y + cirArr[i].radius >= canvas.height || cirArr[i].y <= 0){ 
        cirArr[i].dy *= -1;
             
    } 
   
    if(cirArr[i].infected){
        cirArr[i].timeTillHeal--; 
    }
    if(cirArr[i].timeTillHeal <= 0){
        if(Math.random() <= deathRate){
            cirArr.splice(i, 1);
        }else{
            cirArr[i].immune = true;
            cirArr[i].infected = false;
            cirArr[i].timeTillHeal = 10000;
        }
    }

    
    cirArr[i].x += cirArr[i].dx;
    cirArr[i].y += cirArr[i].dy;
    for(let j = 0; j < cirArr.length; j++){
        if(i == j){
            continue;
        }
        if(collision(cirArr[i], cirArr[j])){
            if(cirArr[i].infected || cirArr[j].infected && cirArr[i].immune == false && cirArr[j].immune == false){
                if(Math.random() < chanceOfInfec){
                    cirArr[i].infected = true;
                    cirArr[j].infected = true;

                }
            }

        }
    }  
    } 
   
}

function collision(cir1, cir2) {
    let a;
    let x;
    let y;
  
    a = cir1.radius*2;
    x = cir1.x - cir2.x;
    y = cir1.y - cir2.y;
  
    if (a > Math.sqrt((x * x) + (y * y))) {
      return true;
    } else {
      return false;
    }
  }

// function collide(cir1, cir2){
//     cir1.dx *= -1;
//     cir1.dy *= -1;
//     cir2.dx *= -1;
//     cir2.dy *= -1;
// }


function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawManyCircles(circles);

}




 
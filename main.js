const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth - 20;
// canvas.height = window.innerHeight - 20;

canvas.width = 1240;
canvas.height = 700;

let numCircs;
let circles; 
let maxSpeed = 5;
let normRadius = 10;
let chanceOfInfec;
let deathRate;
let timeTillHeal;
let step = 0;

let numAlive;
let numInfected = 1;
let numImmune = 0;
let numDead = 0;
let numHealthy;

let infectedArr = [];







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
   let inputNum = parseFloat(input);
   console.log(inputNum);
   if(step === 0){
   numCircs = inputNum;
   numAlive = inputNum;
   numHealthy = inputNum - 1;
   circles = new Array(numCircs); 
   document.getElementById("message").innerHTML = "Enter the Chance of Infection (ex 0.02)";
   step++;
   document.getElementById("numInput").value = "";
   } else if(step === 1){
    chanceOfInfec = inputNum;
    document.getElementById("message").innerHTML = "Enter the death rate (ex 0.06)";
    step++;
    document.getElementById("numInput").value = "";
   }else if(step === 2){
    deathRate = inputNum;
    document.getElementById("message").innerHTML = "Enter the time till cured (sec)";
    step++;
    document.getElementById("numInput").value = "";
   }else {
    timeTillHeal = inputNum * 50;
    document.getElementById("message").innerHTML = "watch the outcome";
    document.getElementById("numInput").value = "";
    fillCircArr(circles);
    setInterval(draw, 20);
   }
   
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
        infectedArr.push(cirArr[i]);
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
            numDead++;
            numAlive--;
            infectedArr.shift();
        }else{
            cirArr[i].immune = true;
            cirArr[i].infected = false;
            cirArr[i].timeTillHeal = 10000;
            numImmune++
            infectedArr.shift();
            
        }
    } 

    
    cirArr[i].x += cirArr[i].dx;
    cirArr[i].y += cirArr[i].dy;


    for(let j = 0; j < cirArr.length; j++){
        if(i == j){
            continue;
        }
        if(collision(cirArr[i], cirArr[j])){
            if(cirArr[i].infected || cirArr[j].infected){ 
                if(!cirArr[i].immune && !cirArr[j].immune){                  
                    if(Math.random() < chanceOfInfec){
                      if(cirArr[i].infected){
                        cirArr[j].infected = true;
                        
                        let matchj = false;
                        for(let k = 0; k < infectedArr.length; k++){
                             if(infectedArr[k] == cirArr[j]){
                                matchj = true;
                                break;
                             }            
                        } if(!matchj){
                            infectedArr.push(cirArr[j]);
                            
                        }
                      } else{
                        cirArr[i].infected = true;
                        
                        let matchi = false;
                        for(let l = 0; l < infectedArr.length; l++){
                             if(infectedArr[l] == cirArr[i]){
                                matchi = true;
                                break;
                             }                           
                        } if(!matchi){
                            infectedArr.push(cirArr[i]);
                            
                        }
                      }
                    }
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

  


function draw(){
   
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawManyCircles(circles);

    ctx.font = "30px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Number alive: " + numAlive, 20, 30);
    // ctx.font = "30px Arial";
    // ctx.fillStyle = "green";
    ctx.fillText("Number Infected: " + infectedArr.length, 20, 30*2);
    // ctx.font = "30px Arial";
    // ctx.fillStyle = "green";
    ctx.fillText("Number unInfected: " + (circles.length - infectedArr.length - numImmune), 20, 30*3);
    // ctx.font = "30px Arial";
    // ctx.fillStyle = "green";
    ctx.fillText("Number Immune: " + numImmune, 20, 30*4);
    // ctx.font = "30px Arial";
    // ctx.fillStyle = "green";
    ctx.fillText("Number Dead: " + numDead, 20, 30*5);
    // ctx.font = "30px Arial";
    // ctx.fillStyle = "green";
    // ctx.fillText("R Naught: "  + 5 , 20, 30*6);

}




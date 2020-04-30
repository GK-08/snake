import { Snake } from "./snakeClass.js";
// import { RIGHT } from "./config.js";

const startBtn=document.getElementById('start-button');
const pauseBtn=document.getElementById('pause-button');
const stopBtn=document.getElementById('stop-button');

const snake = new Snake();
snake.createFood();

function startFunction(){
    snake.move();

    snake.moving=setInterval(function(){
        if(snake.checkIfAteFood()){
            snake.makeBigger();
            snake.createFood();
            snake.updateScore();
        }
        if(snake.checkIfDied()){
            snake.died();
            return;
        }
        snake.move();
    },100);
}


startBtn.addEventListener('click',startFunction,{once:true})

document.onkeydown=function(e){
    if(Math.abs(snake.lastDirection-e.keyCode)!==2)
        if(e.keyCode>36 && e.keyCode<41)
            snake.direction=e.keyCode;
}

pauseBtn.addEventListener('click', ()=>{
    clearInterval(snake.moving);
    startBtn.addEventListener('click',startFunction,{once:true})
})

stopBtn.addEventListener('click',()=>{
    clearInterval(snake.moving);
    snake.reset();
    startBtn.addEventListener('click',startFunction,{once:true})
})
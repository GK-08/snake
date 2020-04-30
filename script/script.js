import { Snake } from "./snakeClass.js";

const startBtn=document.getElementById('start-button');
const pauseBtn=document.getElementById('pause-button');
const stopBtn=document.getElementById('stop-button');

if(localStorage.getItem('highScore')===null)
    document.getElementById(`best-score`).innerHTML=`Best: 0`;
else
    document.getElementById(`best-score`).innerHTML=`Best: ${localStorage.getItem('highScore')}`;


const snake = new Snake();
snake.createFood();

function startFunction(){
    if(!snake.isMoving){
        snake.isMoving=true;
        snake.move();
        snake.moving=setInterval(function(){
            if(snake.checkIfAteFood()){
                snake.makeBigger();
                snake.createFood();
                snake.updateScore();
            }
            if(snake.checkIfDied()){
                snake.reset();
                return;
            }
            snake.move();
        },100);
    }
}


startBtn.addEventListener('click',startFunction)

document.onkeydown=function(e){
    if(Math.abs(snake.lastDirection-e.keyCode)!==2 && snake.isMoving)
        if(e.keyCode>36 && e.keyCode<41)
            snake.direction=e.keyCode;
}

pauseBtn.addEventListener('click', ()=>{
    clearInterval(snake.moving);
    snake.isMoving=false;
})

stopBtn.addEventListener('click',()=>{
    snake.reset();
    snake.isMoving=false;
})
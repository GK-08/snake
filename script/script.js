import { Snake } from "./snakeClass.js";
// import { RIGHT } from "./config.js";

const LEFT=37;
const UP=38;
const RIGHT=39;
const DOWN=40;
const BOARD_WIDTH=board.offsetWidth;
const BOARD_HEIGHT=board.offsetHeight;
const SCORE_CONTAINER=document.getElementById(`score-container`);


const snake = new Snake();
snake.createFood();
snake.move();

document.onkeydown=function(e){
    if(Math.abs(snake.direction-e.keyCode)!==2)
        if(e.keyCode>36 && e.keyCode<41)
            snake.direction=e.keyCode;
}

let moving=setInterval(function(){
    if(snake.checkIfAteFood()){
        snake.makeBigger();
        snake.createFood();
        snake.updateScore();
    }
    if(snake.checkIfDied()){
        console.log(`You Died`);
        clearInterval(moving);
        return;
    }
    snake.move();
},100);




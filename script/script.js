import { Snake } from "./snakeClass.js";
import { RIGHT } from "./config.js";

let direction=RIGHT;

document.onkeydown=function(e){
    if(Math.abs(direction-e.keyCode)!==2)
        if(e.keyCode>36 && e.keyCode<41)
            direction=e.keyCode;
}

const snake = new Snake();
snake.createFood();
snake.move(direction);

let moving=setInterval(function(){
    if(snake.checkIfAteFood()){
        alert('eat');
        snake.makeBigger();
        snake.createFood();
        snake.updateScore();
    }
    if(snake.checkIfDied()){
        console.log(`You Died`);
        clearInterval(moving);
    }
    snake.move(direction);
},200);




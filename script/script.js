import { Snake } from './snake.js';

/*
* These variables point DOM elements
*/

const startBtn = document.getElementById(`start-button`);
const pauseBtn = document.getElementById(`pause-button`);
const stopBtn = document.getElementById(`stop-button`);
const bestScore = document.getElementById(`best-score`);

/*
* Adds best score (if it exists) in best-score div
*/
if(localStorage.getItem('bestScore') !== null){
    bestScore.innerHTML = `Best: ${localStorage.getItem('bestScore')}`;
}

/*
* Declare Snake object and create food
* movingInterval will be assigned setInterval() later
*/
const snake  =  new Snake();
snake.createFood();
let movingInterval;

/*
* When arrow key is clicked on keyborad, direction changes
* Snake cannot move towards opposite direction
*/
document.onkeydown = function(e){
    if(Math.abs(snake.lastDirection-e.keyCode) !== 2 && snake.isMoving)
        if(e.keyCode>36 && e.keyCode<41)
            snake.direction = e.keyCode;
}


/*              Declaring functions for button onclick listeners            */


/*
* Checks if snake is not moving and if so:
*   changes isMoving property to true and sets moving interval;
* Sets moving interval which:
*   If food is eaten makes snake bigger, created food and updates score;
*   If snake dies clears move interval, resets the snake, exits from interval;
*   Keeps snake moving
*/
function startFunction(){
    if(!snake.isMoving){
        snake.isMoving = true;
        movingInterval = setInterval(function(){
            if(snake.checkIfAteFood()){
                snake.makeBigger();
                snake.createFood();
                snake.updateScore();
            }
            if(snake.checkIfDied()){
                clearInterval(movingInterval);
                snake.reset();
                return;
            }
            snake.move();
        }, 100);
    }
}

/*
* Resets the snake, clears interval, changes isMoving property to false;
*/
function stopFunction(){
    snake.reset();
    clearInterval(movingInterval);
    snake.isMoving = false;
}

/*
* Clears interval, changes isMoving property to false;
*/
function pauseFunction(){
    clearInterval(movingInterval);
    snake.isMoving = false;
}


/*          Adding onclick listeners            */
startBtn.addEventListener('click', startFunction)

pauseBtn.addEventListener('click', pauseFunction);

stopBtn.addEventListener('click', stopFunction);
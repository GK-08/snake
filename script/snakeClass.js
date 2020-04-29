import * as config from "./config.js";

class Snake{
    constructor(){
        this.snakeHead=document.createElement(`div`);
        this.snakeHead.classList.add(`snake-cell`);
        board.appendChild(this.snakeHead);
        this.snake=[this.snakeHead];
        this.direction=config.RIGHT;
        this.score=0;
        this.food=document.getElementById(`food`);
    }
    checkIfDied(){
        if(this.snakeHead.offsetLeft<0||this.snakeHead.offsetLeft>config.BOARD_WIDTH-10
            ||this.snakeHead.offsetTop<0||this.snakeHead.offsetTop>config.BOARD_HEIGHT-10){
                alert(this.snakeHead.offsetLeft+'   '+this.snakeHead.offsetTop);
                return true;
            }
        console.log('head:' + this.snakeHead.offsetLeft+'  '+this.snakeHead.offsetTop);
        for(let i=this.snake.length-1; i>0; i--){
            console.log(this.snake[i].offsetLeft+'  '+this.snake[i].offsetTop);
            if(this.snakeHead.offsetLeft===this.snake[i].offsetLeft && 
                this.snakeHead.offsetTop===this.snake[i].offsetTop){
                    alert('kamikaze')
                    return true;
                }
        }
        return false;
    }
    move(direction){
        for(let i=this.snake.length-1; i>0; i--){
            this.snake[i].style.left=`${this.snake[i-1].offsetLeft}px`;
            this.snake[i].style.top=`${this.snake[i-1].offsetTop}px`;
        }
        switch(direction){
            case config.LEFT:
                this.snakeHead.style.left=`${this.snakeHead.offsetLeft-10}px`;
                break;
            case config.UP:
                this.snakeHead.style.top=`${this.snakeHead.offsetTop-10}px`;
                break;
            case config.RIGHT:
                this.snakeHead.style.left=`${this.snakeHead.offsetLeft+10}px`;
                break;
            case config.DOWN:
                this.snakeHead.style.top=`${this.snakeHead.offsetTop+10}px`;
                break;
            default:
                alert('DIRECTION ERROR');
        } 
    }
    updateScore(){
        this.score+=10;
        config.SCORE_CONTAINER.innerHTML=`Score: ${this.score}`;
    }
    makeBigger(){
        const nextCell=document.createElement(`div`);
        nextCell.classList.add(`snake-cell`);
        board.appendChild(nextCell);
        this.snake.push(nextCell);
    }
    checkIfAteFood(){
        if(this.snakeHead.offsetLeft===this.food.offsetLeft && 
            this.snakeHead.offsetTop===this.food.offsetTop){
                return true;
            }
        return false;
    }
    createFood(){
        let X=Math.floor(Math.random()*480);
        let Y=Math.floor(Math.random()*640);
        X-=(X%10);
        Y-=(Y%10);
        food.style.left=`${X}px`;
        food.style.top=`${Y}px`;
    }
}

export {Snake};
const LEFT=37;
const UP=38;
const RIGHT=39;
const DOWN=40;
const BOARD_WIDTH=board.offsetWidth;
const BOARD_HEIGHT=board.offsetHeight;
const CURRENT_SCORE=document.getElementById(`current-score`);
const BEST_SCORE=document.getElementById(`best-score`);//is it really needed?


class Snake{
    constructor(){
        this.snakeHead=document.createElement(`div`);//shall I write these with backtics?
        this.snakeHead.classList.add(`snake-cell`);
        board.appendChild(this.snakeHead);
        this.initialize();

        this.snake=[this.snakeHead];
        for(let i=1; i<5; i++){
            const cell=document.createElement(`div`);
            cell.style.left=`${this.snakeHead.offsetLeft-(10*i)}px`;
            cell.classList.add(`snake-cell`);
            board.appendChild(cell);
            this.snake.push(cell);
        }
        this.food=document.getElementById(`food`);
        this.moving;
    }
    initialize(){
        this.snakeHead.style.top=`0px`;
        this.snakeHead.style.left=`40px`;
        this.direction=RIGHT;
        this.score=0;
        this.isMoving=false;
        CURRENT_SCORE.innerHTML=`Score: ${this.score}`;
    }
    reset(){
        clearInterval(this.moving);
        if(this.score>localStorage.getItem('highScore')){
            localStorage.setItem('highScore',this.score);
            BEST_SCORE.innerHTML=`Best: ${this.score}`;
        }
        this.initialize();
        for(let i=this.snake.length-1; i>0; i--){
            if(i>4){
                this.snake[i].parentNode.removeChild(this.snake[i]);
                this.snake.pop();
            }
            else{
                this.snake[i].style.top=`0px`;
                this.snake[i].style.left=`${this.snakeHead.offsetLeft-(10*i)}px`;
            }
        }

    }
    checkIfDied(){
        const X=this.snakeHead.offsetLeft;
        const Y=this.snakeHead.offsetTop;
        switch(this.direction){
            case LEFT:
                if(X===0){
                    return true;
                }
                break;
            case UP:
                if(Y===0){
                    return true;
                }
                break;
            case RIGHT:
                if(X===BOARD_WIDTH-10){
                    return true;
                }
                break;
            case DOWN:
                if(Y===BOARD_HEIGHT-10){
                    return true;
                }
                break;
        }
        for(let i=this.snake.length-1; i>0; i--){
            if(this.snakeHead.offsetLeft===this.snake[i].offsetLeft && 
                this.snakeHead.offsetTop===this.snake[i].offsetTop){
                    return true;
                }
        }
        return false;
    }
    move(){
        for(let i=this.snake.length-1; i>0; i--){
            this.snake[i].style.left=`${this.snake[i-1].offsetLeft}px`;
            this.snake[i].style.top=`${this.snake[i-1].offsetTop}px`;
        }
        switch(this.direction){
            case LEFT:
                this.snakeHead.style.left=`${this.snakeHead.offsetLeft-10}px`;
                break;
            case UP:
                this.snakeHead.style.top=`${this.snakeHead.offsetTop-10}px`;
                break;
            case RIGHT:
                this.snakeHead.style.left=`${this.snakeHead.offsetLeft+10}px`;
                break;
            case DOWN:
                this.snakeHead.style.top=`${this.snakeHead.offsetTop+10}px`;
                break;
            default:
                alert('DIRECTION ERROR');
        }
        this.lastDirection=this.direction;
    }
    updateScore(){
        this.score+=10;
        CURRENT_SCORE.innerHTML=`Score: ${this.score}`;
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
        let X=Math.floor(Math.random()*BOARD_WIDTH);
        let Y=Math.floor(Math.random()*BOARD_HEIGHT);
        X-=(X%10);
        Y-=(Y%10);
        food.style.left=`${X}px`;
        food.style.top=`${Y}px`;
    }
}

export {Snake};
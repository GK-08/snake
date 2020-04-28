const wormHead=document.createElement(`div`);
wormHead.classList.add(`worm-cell`);
board.appendChild(wormHead);

const left=37;
const up=38;
const right=39;
const down=40;

const snake=[wormHead];

let dir=right;

function moveFood(){
    if(wormHead.offsetLeft===food.offsetLeft && wormHead.offsetTop===food.offsetTop){
        let X=Math.floor(Math.random()*480);
        let Y=Math.floor(Math.random()*640);
        X-=(X%10);
        Y-=(Y%10);
        food.style.left=`${X}px`;
        food.style.top=`${Y}px`;
        const nextCell=document.createElement(`div`);
        nextCell.classList.add(`worm-cell`);
        board.appendChild(nextCell);
        snake.push(nextCell);
    }
    for(let i=snake.length-1; i>0; i--){
        snake[i].style.left=`${snake[i-1].offsetLeft}px`;
        snake[i].style.top=`${snake[i-1].offsetTop}px`;
    }
}

setTimeout(function(){
    let X=Math.floor(Math.random()*480);
    let Y=Math.floor(Math.random()*640);
    X-=(X%10);
    Y-=(Y%10);
    food.style.left=`${X}px`;
    food.style.top=`${Y}px`;
},0);

function move(direction){
    
    let Xposition=wormHead.offsetLeft;
    let Yposition=wormHead.offsetTop;
    if (direction===left){
        wormHead.style.left=`${Xposition-10}px`;
        if(wormHead.offsetLeft<0){
            alert(`Sorry, you lost`);
            clearInterval(moving);
        }
        for(let i=1; i<snake.length; i++){
            if(snake[i].offsetLeft===wormHead.offsetLeft && snake[i].offsetTop==wormHead.offsetTop){
                alert(`Sorry, you lost`);
                clearInterval(moving);
            }
        }
    }
    if (direction===up){
        wormHead.style.top=`${Yposition-10}px`;
        if(wormHead.offsetTop<0){
            alert(`Sorry, you lost`);
            clearInterval(moving);
        }
        for(let i=1; i<snake.length; i++){
            if(snake[i].offsetLeft===wormHead.offsetLeft && snake[i].offsetTop==wormHead.offsetTop){
                alert(`Sorry, you lost`);
                clearInterval(moving);
            }
        }
    }
    if (direction===right){
        wormHead.style.left=`${Xposition+10}px`;
        if(wormHead.offsetLeft>470){
            alert(`Sorry, you lost`);
            clearInterval(moving);
        }
        for(let i=1; i<snake.length; i++){
            if(snake[i].offsetLeft===wormHead.offsetLeft && snake[i].offsetTop==wormHead.offsetTop){
                alert(`Sorry, you lost`);
                clearInterval(moving);
            }
        }
    }
    if (direction===down){
        wormHead.style.top=`${Yposition+10}px`;
        if(wormHead.offsetTop>630){
            alert(`Sorry, you lost`);
            clearInterval(moving);
        }
        for(let i=1; i<snake.length; i++){
            if(snake[i].offsetLeft===wormHead.offsetLeft && snake[i].offsetTop==wormHead.offsetTop){
                alert(`Sorry, you lost`);
                clearInterval(moving);
            }
        }
    }
}

let moving=setInterval(function(){moveFood(); move(dir);},100);


function changeDirection(d){
    clearInterval(moving);
    moving=setInterval(function(){moveFood(); move(d);},100);
}

document.onkeydown=function(e){
    if(Math.abs(dir-e.keyCode)!=2)
    dir=e.keyCode;
    changeDirection(dir);
}
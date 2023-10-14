const state = {
    view:{
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        livesLeft: document.querySelector('#lives-left')
    },
    Values:{
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
       
    },
    actions: {
        countDownTimerId:setInterval(countDown, 1000),
        
    },
};

function countDown (){
    state.Values.currentTime--;
    state.view.timeLeft.textContent = state.Values.currentTime;
    if(state.Values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.currentTime.timerId);
        alert("Game Over!! O seu Resultado foi:" + state.Values.result);
    }
}

function playSond(){
    let audio = new Audio('./src/audioshit');
    audio.volume = 0.2;
    audio.play();
}

function randomSquare () {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    } );

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.Values.hitPosition = randomSquare.id;
}

function moveEnemy (){
    state.Values.timerId = setInterval(randomSquare, state.Values.gameVelocity)
}

function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.Values.hitPosition) {
                state.Values.result++;
                state.view.score.textContent = state.Values.result;
                state.Values.hitPosition = null;
                playSound();
            } else {
               decreaseLife();
            }
        });
    });
}

function decreaseLife(){
    state.Values.lives --;
    state.view.livesLeft.textContent = state.Values.lives;

    if(state.Values.lives <= 0) {
        clearInterval(state.Values.timerId);
        alert("Gamer Over!!! Você perderu todas suas vidas o seu Resultado Foi: " +state.Values.result);
    }
}



function init() {}
moveEnemy();
addListenerHitbox();

init();

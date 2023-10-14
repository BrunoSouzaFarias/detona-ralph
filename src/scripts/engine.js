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
        highScores: [],
       
    },
    actions: {
        countDownTimerId:setInterval(countDown, 1000),
        
    },
};

const difficultyLevels = {
    easy: {
        gameVelocity: 1500,
        currentTime: 90,
    },
    medium: {
        gameVelocity: 1000,
        currentTime: 60,
    },
    hard: {
        gameVelocity: 800,
        currentTime: 45,
    },
};

function chooseDifficulty(level) {
    state.Values.gameVelocity = difficultyLevels[level].gameVelocity;
    state.Values.currentTime = difficultyLevels[level].currentTime;
    
}

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
                playSond();
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


function saveHighScores() {
    localStorage.setItem('highScores', JSON.stringify(state.Values.highScores));
}

function loadHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores'));
    if (highScores) {
        state.Values.highScores = highScores;
    }
}


function addHighScore(score) {
    state.Values.highScores.push(score);
    state.Values.highScores.sort((a, b) => b - a); 
    state.Values.highScores = state.Values.highScores.slice(0, 10);
    saveHighScores();
}

const startGameButton = document.getElementById('start-game-button');

startGameButton.addEventListener('click', () => {
  
    chooseDifficulty('easy');
    moveEnemy(); 
    startGameButton.style.display = 'none';
});

function init() {}
moveEnemy();
addListenerHitbox();
saveHighScores();
loadHighScores();
init();

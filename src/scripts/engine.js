const state = {
    view:{
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score')
    },
    Values:{
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
};

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
            state.Values.result++
            state.view.score.textContent = state.Values.result;
            state.Values.hitPosition = null;
        }
       } )
    })
}





function init() {}
moveEnemy();
addListenerHitbox();

init();

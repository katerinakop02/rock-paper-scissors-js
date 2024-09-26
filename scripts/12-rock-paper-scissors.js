let score = JSON.parse(localStorage.getItem('score'));

if(score === null) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };

}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
}

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 2000);
        isAutoPlaying = true;
    }
    else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }

    const buttonElement = document.querySelector('.js-auto-play-button');
        
    if(buttonElement.innerHTML === 'Auto Play') {
        document.querySelector('.js-auto-play-button').innerHTML = 'Stop Play';
    }
    else if(buttonElement.innerHTML === 'Stop Play') {
        document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    }
}

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    }
    else if (event.key === 'p') {
        playGame('paper');
    }
    else if(event.key === 's') {
        playGame('scissors')
    }
});

function playGame(playerMove) {
const computerMove = pickComputerMove();

let result = '';

if(playerMove === 'scissors') {
        
    if(computerMove === 'rock') {
        result = 'You lose.'
    }
    else if(computerMove === 'paper') {
        result = 'You win.'
    }
    else if(computerMove === 'scissors') {
        result = 'Tie.'
    }
}
else if(playerMove === 'paper') {

    if(computerMove === 'rock') {
        result = 'You win.'
    }
    else if(computerMove === 'paper') {
        result = 'Tie.'
    }
    else if(computerMove === 'scissors') {
        result = 'You lose.'
    }
}
else if(playerMove === 'rock') {

    if(computerMove === 'rock') {
        result = 'Tie.'
    }
    else if(computerMove === 'paper') {
        result = 'You lose.'
    }
    else if(computerMove === 'scissors') {
        result = 'You win.'
    }
}

if(result === 'You win.'){
    score.wins++;
}
else if(result === 'You lose.') {
    score.losses++;
}
else if(result === 'Tie.') {
    score.ties++;
}

//localStorage only supports strings, therefore we convert score using JSON.stringify
localStorage.setItem('score',  JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result').innerHTML = result;

document.querySelector('.js-moves').innerHTML = `You 
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
};

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if(randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
    }
    else if(randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove = 'paper';
    }
    else if(randomNumber >= 2/4 && randomNumber < 1)
    {
        computerMove = 'scissors';
    }

    return computerMove;
}

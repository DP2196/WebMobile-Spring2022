// user choice input
const getPlayerChoice = PlayerInput =>{
    PlayerInput = PlayerInput.toLowerCase();
    if (PlayerInput === 'rock' || PlayerInput ==='paper' || PlayerInput ==='scissors') {
        return PlayerInput;
    } else {
        console.log('not a valid choice');
    }
};

// Creating computer choice:
function getComputerChoice() {
    switch(Math.floor(Math.random()*3)) {
        case 0:
            return 'rock';
            break;
        case 1:
            return 'scissors';
            break;
        case 2:
            return 'paper';
            break;
    };
}

//  winner of the game:

function gameWinner(PlayerChoice,computerChoice) {
    if (PlayerChoice === computerChoice) {
        return 'It\'s a tie!';
    } else if (PlayerChoice === 'rock') {
        if (computerChoice === 'paper') {
            return 'Computer won!';
        } else {
            return 'You won!';
        }
    } else if (PlayerChoice === 'paper'){
        if (computerChoice === 'scissors') {
            return 'Computer won!';
        }else {
            return 'You won!';
        }
    } else if (PlayerChoice === 'scissors') {
        if (computerChoice === 'rock') {
            return 'Computer won!';
        } else {
            return 'You won!';
        }
    }
};

// Calling the playGame function:
function playGame(choice) {
    var PlayerChoice = getPlayerChoice(choice);
    var computerChoice = getComputerChoice()
    document.getElementById('Player-choice').innerHTML = `Player Selected : ${PlayerChoice}`;
    document.getElementById('computer-choice').innerHTML = `Computer Selected : ${computerChoice}`;
    document.getElementById('final-result').innerHTML = gameWinner(PlayerChoice, computerChoice);
};
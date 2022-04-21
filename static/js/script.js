// alert('hello');
console.log('hello prabu');

function ageInDays() {
    var birthYear = prompt('What year were you born... my friend?');
    // var date = new Date();
    var crtYear = new Date().getFullYear();
    var ageInDayss = (crtYear-birthYear)*365;
    // console.log(ageInDayss);
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are '+ageInDayss+' days old.');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('resulte').appendChild(h1);
};

function reset(){
    document.getElementById('resulte').remove();
};

console.log(new Date());


// cat gen

function generatCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

// Challenge 3: rock, paper , scissors 

function rpsGame(yourChoice){
    console.log(yourChoice);

    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    
    botChoice = numberToChoice(randToRpsInt());
    console.log('Computer choice', botChoice);
    
    results = decideWinner (humanChoice, botChoice); // [0,1] human lost, bot won <or> [0.5,0.5] tie
    console.log(results);
    
    message = finalMessage(results); // ' {'message': 'you won', 'color': 'green'}
    console.log(message);

    rpsFrontEnd(yourChoice.id, botChoice, message);

}
function randToRpsInt() {
    return Math.floor(Math.random() *3);
}

function numberToChoice(number) {
    return ['rock','paper','scissors'][number];
}

function decideWinner (yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock':{'scissors':1, 'rock':0.5, 'paper':0},
        'paper':{'scissors':0, 'rock':1, 'paper':0.5},
        'scissors':{'scissors':0.5, 'rock':0, 'paper':1}
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];

}

function finalMessage([yourScore, computerScore]){
    if (yourScore === 0) {
        return {'message': 'You Lost!', 'color':'red'};
    }else if( yourScore === 0.5) {
        return {'message':'You Tied!', 'color':'orange'};
    }else{
        return{ 'message': 'You Won!', 'color':'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src

    }
    // let's remove all the image
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    
    humanDiv.innerHTML = "<img src=' "+ imagesDatabase[humanImageChoice] + 
    " 'style='box-shadow: 0px 5px 20px rgba(87, 147, 252, 1);background-color: #0679fdc9; border-radius: 16px;'>"
    
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size:60px; padding:100px;'>" + finalMessage['message'] + "</h1>"

    botDiv.innerHTML = "<img src=' "+ imagesDatabase[botImageChoice] + 
    " 'style='box-shadow: 0px 5px 20px rgba(252, 14, 87, 1); background-color: #fd0658c9; border-radius: 16px;'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
} 

//Challenge 4: Change the color of all Button

let  all_button = document.getElementsByTagName('button');
// console.log(all_button);

let copyAllButtons = [];
for (let i=0; i < all_button.length; i++) {
    copyAllButtons.push(all_button[i].classList[1]);
} ;
// console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonRed();
    }else if (buttonThingy.value === 'green') {
        buttonGreen();
    }else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    }else if (buttonThingy.value === 'random') {
        randomColors();
    }
};

function buttonRed() {
    for (let i = 0; i < all_button.length; i++) {
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add('btn-danger');
    }
};

function buttonGreen() {
    for (let i = 0; i < all_button.length; i++) {
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add('btn-success');
    }
};

function buttonColorReset() {
    for (let i = 0; i < all_button.length; i++) {
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add(copyAllButtons[i]);
    }
};

function randomColors() {
    let choices = [ 'btn-primary','btn-danger','btn-warning','btn-success'];
    
    for (let i = 0; i < all_button.length; i++) {
    let randomChoice = Math.floor(Math.random() *4 );
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add(choices[randomChoice]);
    }
};


// Challenge 5: BlackJack 

let blackjackGame = {
    'you' : { 'scoreSpan': '#your-blackjack-result', 'div':'#your-box', 'score':0 },
    'dealer' : { 'scoreSpan': '#dealer-blackjack-result', 'div':'#dealer-box', 'score':0 },
    'cards': ['2', '3','4','5','6','7','8','9','10','K','J','Q','A'],
}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/bjSoundCopy.m4a');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDealer);

function blackjackHit(){
    let card = randamCard();
    console.log(card);
    showCard(card,YOU);
};

function randamCard() {
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
};

function showCard (card, activePlayer){
    let cardImage = document.createElement('img');
    cardImage.src = `static/Cards/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
};

function blackjackDealer(){
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
    for (let i = 0; i < yourImages.length; i++) {
        yourImages[i].remove();
        
    };
    for (let i = 0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
        
    };
};


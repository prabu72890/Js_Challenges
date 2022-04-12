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
        return {'message':'You Tied!', 'color':'yellow'};
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
    
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 40px; padding:10px;'>" + finalMessage['message'] + "</h1>"

    botDiv.innerHTML = "<img src=' "+ imagesDatabase[botImageChoice] + 
    " 'style='box-shadow: 0px 5px 20px rgba(252, 14, 87, 1); background-color: #fd0658c9; border-radius: 16px;'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
} 




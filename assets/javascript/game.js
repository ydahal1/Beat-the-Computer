var images = ['assets/images/1.png', 'assets/images/2.png', 'assets/images/3.png', 'assets/images/4.png'];
var options = [2, 1, 3, 5, 4, 10, 12];
var points = 00;
var win = 00;
var loss = 00;
var round = 00; 
var clickedId;
var keyPunch = new Audio('assets/sounds/keypress.mp3');
var errorSound = new Audio('assets/sounds/error.mp3');
var correctSound = new Audio('assets/sounds/correct.wav');
var betGame;
var winningPoints = randomNumber();

$(document).ready( function (){
    //Displays points plays, wins and losses
    displayElements();
    //Displays coins and gives values the coin
    displyCoins();

    $('body').click(function(event){
         clickedId = event.target.id;

         if (clickedId === 'image0' || clickedId === 'image1' || clickedId === 'image2' || clickedId === 'image3'){
        
             keyPunch.play();

             var coinValue = $("#" + clickedId).attr('coinValue');
             points += parseInt(coinValue);
             displayElements();
        
             if(points === winningPoints){
                correctSound.play();
                betGame = true;
                aWin();
                showResultPanel(betGame);
                displayElements();

                 
             }else if( points > winningPoints){
                betGame = false;
                errorSound.play();
                aLoss();
                showResultPanel(betGame);
                displayElements();             
             }else{
            
             }   
         }else{
        
         }
    });  
});

// ############################## Event Listiners ##################################
$('#playAgainButton').click( function(){
    replayGame();
    displayElements();
    $('#resultPanel').hide();
    $('#jewelsPanel').show();
})

$('#resetButoon').click( function (){
    resetGame();
    displayElements();
    $('#resultPanel').hide();
    $('#jewelsPanel').show();
})
// ############################## Functions ########################################
function randomNumber(){
     var number = Math.floor(Math.random()*(120-19+1)+19);
     return number;
    }


function displayElements(){
    $('#winningPoints').text(winningPoints);
    $('#yourPoints').text(points);
    $('#totalPlays').text("Total Plays: " + round);
    $('#yourWin').text("Your Wins : " + win);
    $('#yourLoss').text("Your Losses: " + loss);
    
}

function aWin(){
    win += 1;
    round += 1;
    $('.jewelImage').empty();
    options = [2, 1, 3, 5, 4, 10, 12];
    displyCoins();
}
function aLoss(){
    loss += 1;
    round += 1; 
    $('.jewelImage').empty();
    options = [2, 1, 3, 5, 4, 10, 12];
    displyCoins();
}

function displyCoins(){
    $('.jewelImage').each(function (i){
        var randomPick = Math.floor(Math.random() * options.length);
        var img = $('<img />',{ src :images[i],
                   class :'jewelImage',
                   id : 'image'+i,
                   width : '190',
                   height : '190',
                   coinValue : options[randomPick]});
                   options.splice(randomPick, 1);
        $(this).append(img);
    });
}

function showResultPanel(betGame){
    if(betGame){
        $('#resultPanelBody').css("backgroundColor", "green");
        $('#resultPanel').show();
        $('#jewelsPanel').hide();
        console.log(betGame);
    }else{
        $('#resultPanelBody').css("backgroundColor", "red");
         $('#resultPanel').show();
         $('#jewelsPanel').hide();    
         console.log(betGame);
}
}

function replayGame(){
    points = 00;
    winningPoints = randomNumber();
}

function resetGame(){
    round = 00;
    points = 00;
    loss = 00;
    win = 0;
    winningPoints = randomNumber();
}
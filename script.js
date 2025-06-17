
var colors = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {

    level++;
    $("#level-title").text("Level " + level);
    userPattern = []; 

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = colors[randomNumber];
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
}

$(".btn").click(function(){
    var userChosenColor = this.id;
    userPattern.push(userChosenColor);
    console.log(userPattern);

    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userPattern.length - 1);

})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {

        if (userPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        started = false;
        gamePattern = [];
        userPattern = [];
        level = 0; 
    }   
}

function animatePress(color){
    $("#"+ color ).addClass("pressed");
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    },100);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(presentStage) {
    if (gamePattern[presentStage] === userClickedPattern[presentStage]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor((Math.random()) * 4);
    var randomChoosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColour);
    $('#' + randomChoosenColour).fadeOut(100).fadeIn(50);
    playSound(randomChoosenColour);
    console.log("system produces " + gamePattern);
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var soundPath = "sounds/" + name + ".mp3";
    var buttonSound = new Audio(soundPath);
    buttonSound.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }









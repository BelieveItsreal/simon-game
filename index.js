var gamePattern = [];
var userClickedPattern = [];

var buttonCOlors = ["red", "blue", "green", "yellow"];

//detect when a keyboard is button is pressed
var started = false;
var level = 0;
$(document).on("keydown", function(){
    //calling nextSequence
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonCOlors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3")
    audio.play();
    return audio;
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    }, 100);
}

//step 1. Detect when the button is clicked
$(".btn").on("click", function(){
    //step 2. Get the id of the clicked button
    var userChosenColour = $(this).attr("id");

    //Add the clicked color to the userClickedPattern Array
    userClickedPattern.push(userChosenColour);

    //play the sound for the clicked button
    playSound(userChosenColour);

    //animate the button
    animatePress(userChosenColour);

    //check answer
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]  === gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
} else{
    console.log("Wrong");
    //game over logic
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press any key to Restart");

    startOver();
    }
}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
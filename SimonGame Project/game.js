var btnColors = ["green","red","yellow","purple"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;

function playSound (sound) {
    var audio = new Audio("./sounds/"+sound+".mp3");
    audio.play();
}

$(document).keypress (function () {
    if(started == false) {
        $("#title").text ("Level "+level);
        started = true;
        nextSequence();
    }
});

function nextSequence () {

    level++;
    userPattern = [];
    
    $("#title").text ("Level "+level);
    console.log("Color : " + randomClr);

    var randomNum = Math.floor(Math.random() * 4);
    var randomClr = btnColors[randomNum];

    gamePattern.push(randomClr);
    
    $("#"+randomClr).fadeIn(100).fadeOut(100).fadeIn(100);
//    animatePressed (randomClr);
    playSound(randomClr);
}

//user input here ---->
$(".button").click(function() {
    
    if (started == false)
        return;

    var userChosenClr = $(this).attr("id");
    
    userPattern.push(userChosenClr);
    
    console.log(userPattern);
    animatePressed (userChosenClr);
    playSound (userChosenClr);

    checkAnswer (userPattern.length - 1);
});

function animatePressed (button) {
    $("#"+button).addClass ("pressedBtn");

    setTimeout (function () {$("#"+button).removeClass ("pressedBtn");},
        100);
}

function checkAnswer (currLevel) {
    if (gamePattern[currLevel] === userPattern[currLevel]) {
        
        console.log("Success!");

        if (userPattern.length === gamePattern.length) {
            setTimeout (function () {
                nextSequence();
            },1000);
        }
    } else {
        console.log("Failed!");
        playSound("wrong");
        $("body").addClass ("gameOver");

        setTimeout(function(){
            $("body").removeClass ("gameOver");
        }, 200);

        $("#title").fadeIn(100).fadeOut(100).fadeIn(100);
        $("#title").text("Game Over! Press any key to Restart!");
        restartGame ();
    }
}

function restartGame () {
    level = 0;
    started = false;
    gamePattern = [];
}
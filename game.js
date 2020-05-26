//button colorrs are being chosen
var buttonColors = ["red", "blue", "green", "yellow"];
//we made the gam gamePattern
var gamePattern = [];
//made the user click pattern
var userClickedPattern = [];
//need a way to keep the track whether the game has been started or not!
var started = false;
//setting the variable level
var level = 0;
//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level"  + level);
    nextSequence();
    started = true;
  }
});


//made a function to respond a click event
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){

  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

    console.log("success");

    if(userClickedPattern.length===gamePattern.length){

    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}else{
    console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
  }
}


//thie sfunction allocates and choose the random color and make a sequence
function nextSequence() {
    userClickedPattern = [];
  level++;
  //whenever called for the next time change the h1 tag
  $("#level-title").text("Level" +" "+ level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosencolour = buttonColors[randomNumber];
  gamePattern.push(randomChosencolour);
  $("#" + randomChosencolour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosencolour);

}




function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

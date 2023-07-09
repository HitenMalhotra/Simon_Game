var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;

// Appending Colour
function nextSequence() {
  var randomNo = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNo];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100); //Basic Fade
  playSound(randomChosenColour);
  level = level + 1;
  $("#level-title").text("Level " + level); //New level declaration
  userPattern = []; //Clearing previous sequence
}

// Detecting the button
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAns(userPattern.length); //checking if the user is going good
});

// To check if the User has pressed the right key
function checkAns(currentPress) {
  if (userPattern[currentPress - 1] != gamePattern[currentPress - 1]) {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);
    level = 0; //Starting Again
    gamePattern = [];
  }

  if (userPattern.length == gamePattern.length)
    //Progressing to the next level
    setTimeout(nextSequence, 1500);
}

// Playing sound
function playSound(soundName) {
  var audio = new Audio("sounds/" + soundName + ".mp3");
  audio.play();
}

// Adding Animation
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

// Calling the function only on first key press
$(document).keypress(function () {
  if (!level) {
    $("#level-title").text("Level 0");
    nextSequence();
  }
});

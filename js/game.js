var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
//var spaceBarPressed = false;


//plays any sound
function playSound(name) {
  var whichSound = new Audio("sounds/" + name + ".mp3")
  whichSound.play();
}


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () { nextSequence(); }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () { $("body").removeClass("game-over"); }, 100)
    $("h1").text("Game over! Press SPACE to start.");
    gamePattern = [];
    level = 0;
  }
}

//game selects a random color and adds it to a game pattern
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  switch (randomNumber) {
    case 0: $("#red").fadeOut(100).fadeIn(100);
      playSound("red");
      break;
    case 1: $("#blue").fadeOut(100).fadeIn(100);
      playSound("blue");
      break;
    case 2: $("#green").fadeOut(100).fadeIn(100);
      playSound("green");
      break;
    case 3: $("#yellow").fadeOut(100).fadeIn(100);
      playSound("yellow");
      break;
  }
  level++;
  $("#level-title").text("Level " + level);
}

//starts game on first keypress
$(document).on("keydown", function (event) {
  if (gamePattern.length === 0 && event.keyCode === 32) {
    $("#level-title").text("Level " + level);
    setTimeout(function () { nextSequence() }, 300)
  }
  //prevents the space bar input to scroll the page down, which is the default setting
  if (event.keyCode === 32 && event.target === document.body) {
    event.preventDefault();
  }
})

//adds the clicked colors to an array
$(".btn").click(function (event) {
  SelectButton(['g', 'r', 'y', 'b'], event.target.id, false);
});

//the same thing again as above but for keyboard inputs
$("body").on("keydown", function (event) {
  SelectButton(['q','w','a','s'], event.key, true);
});

function SelectButton(characters, whichButton, skipDefault) {
  if (level > 0) {
    var userChosenColor;

    //this is needed so that id doesn't matter if you click on the letter or the button itself
    switch (whichButton) {
      case characters[0]:
        userChosenColor = "green";
        break;
      case characters[1]:
        userChosenColor = "red";
        break;
      case characters[2]:
        userChosenColor = "yellow";
        break;
      case characters[3]:
        userChosenColor = "blue";
        break;
      default:
        if (skipDefault){
          return;
        }
        userChosenColor = whichButton;
        break;
    }

    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);

    //flash-animation
    function animatePress(currentColor) {
      var currentColor = "#" + currentColor;
      $(currentColor).addClass("pressed");
      setTimeout(function () { $(currentColor).removeClass("pressed"); }, 100); //adds a delay of 100ms
    }
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }
}
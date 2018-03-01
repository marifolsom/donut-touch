console.log('app.js linked!');

/////////////// HOW TO PLAY ///////////////
// Enter the game website
// Enter username -- form input
// Click 'Play!' -- button linked to levels.html
// Select a level -- each level button is linked to its respective level's html file
// Open selected level file
// Objects are already moving, items are already placed and ready to go
// User's cursor enters the start zone and clicks
// On click, level timer starts counting (up or down?)
// If cursor enters into obstacle element, everything turns red -- 'GAME OVER' pop-up
// If cursor makes it all the way to end zone and clicks, timer stops -- 'Level cleared!' pop-up
// User has the option to play the level over (if they didn't win or want to get a higher score), return back to the menu, or if they cleared the level, they can advance to the next level -- link to next
// Once the player has cleared all (five?) levels, they've beat the game! -- 'Congratulations' page



// Make a variable that stores the user's total points
var totalScore = 0;
// Make a variable that stores the user's time
var userTime = 0;
// Make a variable that keeps track of the user's score
var userScore = 0;


// Make a function that when the user clicks on the start/end zones will start the timer, and turn the obstacle mouseenter event listeners on
var clickZone = (evt) => {
  var element = evt.target
}

// Make a function that when the user's cursor enters into the obstacle elements, the timer stops, and the objects and game screen turn red and triggers the 'GAME OVER' pop-up
var touchObstacle = (evt) => {
  var element = evt.target
}

// Make a function that when the user clicks on the end zone, the timer is stopped, and the 'Level cleared!' pop up is triggered
var clearedLevel = (evt) => {
  var element = evt.target
}

// Make a function that calculates the user's score
var getUserScore = () => {

}


// Add event listeners -- start/end zones, all the obstacles, items
var gameScreen = document.querySelector('.game-screen');
var startZone = document.getElementbyId('start-zone');
var endZone = document.getElementbyId('end-zone');
var obstacles = ;

startZone.addEventListener (
  'click',
  // function that starts the timer and turns on the obstacle event listeners
);

endZone.addEventListener (
  'click',
  // function that stops timer and triggers the 'Level cleared!' pop-up
);

obstacles.addEventListener (
  'onmouseenter',
  // function that stops the timer and triggers the 'GAME OVER' pop-up
)

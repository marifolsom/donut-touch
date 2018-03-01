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


// Make a variable for the page body
let body = document.body;
// Make a variable that stores the user's current score
let score = document.querySelector('#user-score');
// Make variables for the zones, obstacles, and items
let startZone = document.querySelector('#start-zone');
let endZone = document.querySelector('#end-zone');
let obstacles = document.querySelectorAll('.obstacle');
let donuts = document.querySelectorAll('.donut');


// Make a function that creates a pop up
let makePopUp = () => {
  // // If popUp doesn't exist create pop up elements
  // if (!!document.body.contains(popUp)) {
    // Create elements
    let popUp = document.createElement('section');
    let popUpText = document.createElement('h2');
    let resetButton = document.createElement ('a');
    let nextButton = document.createElement ('a');
    let menuButton = document.createElement ('a');

    // Give elements a class
    popUp.className = 'pop-up';
    resetButton.className = 'button';
    nextButton.className = 'button';
    menuButton.className = 'button';

    // Text content for each element
    resetButton.textContent = 'Play again';
    nextButton.textContent = 'Next level';
    menuButton.textContent = 'Return to menu';

    // Link for each element
    resetButton.href = 'level-one.html';
    nextButton.href = 'level-two.html';
    menuButton.href = 'index.html';

    // Append elements to body
    body.append(popUp);
    popUp.append(popUpText, resetButton, nextButton, menuButton);
  // // Otherwise do nothing
  // } else {
  //   console.log('pop up already exists!');
  // }
}


// Make a function that when the user's cursor enters into the obstacle elements, the objects and game screen turn red and triggers the 'GAME OVER' pop-up
let setGameOver = (evt) => {
  let element = evt.target;
  let gameScreen = document.querySelector('.game-screen');

  // change styling of game screen + obstacles
  gameScreen.setAttribute('style', 'background-color: #cc0000');

  // pop up function with a 1 second delay
  setTimeout ( () => {
    makePopUp();
    // change pop up title 'GAME OVER'
    let popUpText = document.querySelector('.pop-up > h2');
    popUpText.textContent = 'GAME OVER';
  }, 500);

  for (let i = 0; i < donuts.length; i++) {
    // Remove event listeners from each donut after game over
    donuts[i].removeEventListener (
      // function that adds to the user's score
      'mouseenter', getUserScore
    );
  }
}


// Make a function that when the user clicks on the end zone, the obstacle event listeners are turned off, and the 'Level cleared!' pop up is triggered
let setLevelCleared = (evt) => {
  let element = evt.target;

  console.log('clicked!');

  for (let i = 0; i < obstacles.length; i++) {
    // Remove event listeners from the obstacles once the level has been cleared
    obstacles[i].removeEventListener (
      // function that triggers the 'GAME OVER' pop-up
      'mouseenter', setGameOver
    );
  }

  // pop up function with a 1 second delay
  setTimeout ( () => {
    makePopUp();
    // change pop up title 'Level cleared!'
    let popUpText = document.querySelector('.pop-up > h2');
    popUpText.textContent = 'LEVEL CLEARED!';
  }, 500);
}


// Make a function that when the user clicks on the start zone, the obstacle mouseenter event listeners are turned on
let startGame = (evt) => {
  let element = evt.target;

  console.log('clicked!');

  // Add event listener to end zone
  endZone.addEventListener (
    // function that turns off the obstacle even listeners and triggers the 'Level cleared!' pop-up
    'click', setLevelCleared
  );

  for (let i = 0; i < obstacles.length; i++) {
    // Add event listeners to each obstacle after starting level
    obstacles[i].addEventListener (
      // function that triggers the 'GAME OVER' pop-up
      'mouseenter', setGameOver
    );
  }

  for (let i = 0; i < donuts.length; i++) {
    // Add event listeners to each donut after starting level
    donuts[i].addEventListener (
      // function that adds to the user's score
      'mouseenter', getUserScore
    );
  }
}


// Make a function that adds zeros to the front of the user's score
let addZeros = (score) => { // After trying to concatenate strings and failing, I found a solution on stack overflow that utilizes slice: https://stackoverflow.com/questions/30490968/adding-zeros-in-front-of-a-string
  return ("0000" + score).slice(-4);
}


// Make a function that calculates the user's score, removes the event listener from the donut, and turns donut grey
let getDonutScore = (evt) => {
  console.log('donut!');

  let element = evt.target;
  let donutPoints = element.getAttribute('points');
  let currentScore = score.textContent;
  let newScore = Number(currentScore) + Number(donutPoints);
  score.textContent = addZeros(newScore);

  // Grey out the donut once it's been collected so the user can know which ones they've already collected, and they can't collect it again
  element.style.filter = "grayscale(80%)";

  // Remove event listener from each donut
  element.removeEventListener (
    'mouseenter', getUserScore
  );
}


// Add event listener to start zone
startZone.addEventListener (
  // function that turns on the obstacle event listeners
  'click', startGame
);

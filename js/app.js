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
let $body = $('body');
// Make a variable that stores the user's current score
let score = document.querySelector('#user-score');
let $score = $('#user-score');
// Make variables for the zones, obstacles, and items
let gameScreen = document.querySelector('.game-screen');
let startZone = document.querySelector('#start-zone');
let endZone = document.querySelector('#end-zone');
let obstacles = document.querySelectorAll('.obstacle');
let donuts = document.querySelectorAll('.donut');
// // Make variable for the user input
// let userInput = document.querySelector('.input');
// let playButton = document.querySelector('#play-button');
// let username = '';
//
//
// // Add event listner to the playButton to store the username
// playButton.addEventListener('click', function (evt) {
//   username = userInput.value;
//   console.log(username);
//
//   let navUsername = document.querySelector('#username');
//   navUsername.textContent = username;
// });


// Make a function that creates a pop up
let makePopUp = () => {
  // If pop up already exists, do nothing
  if (document.getElementById('pop-up-div')) {
    console.log('pop up already exists!');
  // Otherwise make pop up!
  } else {
    // Create and append pop up elements
    let $popUp = $('<section class="pop-up" id="pop-up-div"><h2></h2> <a class="button" onClick="window.location.reload()">Play again</a> <a class="button next-level">Next level</a> <a class="button" href="index.html">Return to menu</a> <p>Score: ' + $score.text() + '</p> </section>');
    $body.append($popUp);

    // Link to next level
    let $nextLevel = $('.next-level');
    $nextLevel.attr('href', 'level-two.html');
  }
}


// Make a function that when the user's cursor enters into the obstacle elements, the objects and game screen turn red and triggers the 'GAME OVER' pop-up
let setGameOver = (evt) => {
  let element = evt.target;
  // change styling of game screen
  gameScreen.style.backgroundColor = "#d00000";

  // pop up function with a 1 second delay
  setTimeout ( () => {
    makePopUp();
    // change pop up title 'GAME OVER'
    let popUpText = document.querySelector('.pop-up > h2');
    popUpText.textContent = 'GAME OVER';
  }, 500);

  // Remove event listeners from each donut after game over
  for (let i = 0; i < donuts.length; i++) {
    donuts[i].removeEventListener (
      'mouseenter', getDonutScore
    );
  }
}


// Make a function that when the user clicks on the end zone, the obstacle event listeners are turned off, and the 'Level cleared!' pop up is triggered
let setLevelCleared = (evt) => {
  let element = evt.target;

  console.log('clicked!');

  // Remove event listeners from the obstacles once the level has been cleared
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].removeEventListener (
      'mouseenter', setGameOver
    );
  }

  // Remove event listener from the game screen after level cleared
  gameScreen.removeEventListener (
    'mouseleave', setGameOver
  );

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
    'click', setLevelCleared
  );

  // Add event listener to the game screen
  gameScreen.addEventListener (
    'mouseleave', setGameOver
  );

  // Add event listeners to each obstacle after starting level
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].addEventListener (
      'mouseenter', setGameOver
    );
  }

  // Add event listeners to each donut after starting level
  for (let i = 0; i < donuts.length; i++) {
    donuts[i].addEventListener (
      'mouseenter', getDonutScore
    );
  }
}


// Make a function that adds zeros to the front of the user's score
let addZeros = (score) => { // After trying to concatenate strings and failing, I found a solution on stack overflow that utilizes slice: https://stackoverflow.com/questions/30490968/adding-zeros-in-front-of-a-string
  return ("0000" + score).slice(-4);
}


// Make a function that calculates the user's score, removes the event listener from the donut, and turns donut grey
let getDonutScore = (evt) => {
  let element = evt.target;
  let donutPoints = element.getAttribute('points');
  let currentScore = score.textContent;
  let newScore = Number(currentScore) + Number(donutPoints);
  score.textContent = addZeros(newScore);

  // Grey out the donut once it's been collected so the user can know which ones they've already collected, and they can't collect it again
  element.style.filter = "grayscale(80%)";

  // Remove event listener from each donut
  element.removeEventListener (
    'mouseenter', getDonutScore
  );
}


// Add event listener to start zone
startZone.addEventListener (
  'click', startGame
);

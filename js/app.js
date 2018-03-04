console.log('app.js linked!');


// Make a variable for the page body
let $body = $('body');
let $main = $('.container');
// Make a variable to store the user's score
let $score = $('#user-score');
// Make a variavle to store the current level being played
let currentLevel = '';
// Aake a variable for the user's username
let username = '';
// Make variables for the play button
let playButton = document.querySelector('.play-button');


// Make a function that takes the user's inputted username and places it in the username variable so it can be used later
let storeUsername = () => {
  let userInput = document.querySelector('.input');
  username = userInput.value;
}


// Add event listner to the playButton to store the username
playButton.addEventListener('click', storeUsername);


// Make a function that takes the value of username and displays it in the nav bar once the DOM element has been created
let displayUsername = () => {
  let navUsername = document.querySelector('#username');
  navUsername.textContent = username;
  console.log(username);
}


// Make a function that creates a pop up
let makePopUp = () => {
  // If pop up already exists, do nothing
  if (document.getElementById('pop-up-div')) {
    console.log('pop up already exists!');
  // Otherwise make pop up!
  } else {
    // Create and append pop up elements
    let $popUp = $('<section class="pop-up" id="pop-up-div"><h2></h2><a class="button current-level">Play again</a><a class="button next-level">Next level</a><a class="button" href="index.html">Return to menu</a><p>Score: ' + $score.text() + '</p> </section>');
    $body.append($popUp);
    // Add links to current and next levels to pop up buttons depending on what level is currently being played
    let current = document.querySelector('.current-level');
    let next = document.querySelector('.next-level');
    switch (currentLevel) {
      // If current level is level one
      case 1:
        current.addEventListener ('click', makeLevelOne);
        next.addEventListener ('click', makeLevelTwo);
        break;
      // If current level is level two
      case 2:
        current.addEventListener ('click', makeLevelTwo);
        next.addEventListener ('click', makeLevelThree);
        break;
      // If current level is level three
      case 3:
        current.addEventListener ('click', makeLevelThree);
        next.addEventListener ('click', makeLevelFour);
        break;
      // If current level is level four
      case 4:
        current.addEventListener ('click', makeLevelFour);
        next.addEventListener ('click', makeLevelFive);
        break;
      // If current level is level five
      case 5:
        current.addEventListener ('click', makeLevelFive);
        next.addEventListener ('click', makeLevelsPage);
        break;
    }
  }
}


// Make a function that adds zeros to the front of the user's score
let addZeros = (score) => { // After trying to concatenate strings and failing, I found a solution on stack overflow that utilizes slice: https://stackoverflow.com/questions/30490968/adding-zeros-in-front-of-a-string
  return ("0000" + score).slice(-4);
}


// Make a function that calculates the user's score, turns donut grey, makes donut sound, and removes the event listener from donuts
let getDonutScore = (evt) => {
  let element = evt.target;
  let score = document.querySelector('#user-score');
  let donutPoints = element.getAttribute('points');
  let currentScore = score.textContent;
  let newScore = Number(currentScore) + Number(donutPoints);
  score.textContent = addZeros(newScore);
  // Grey out the donut once it's been collected so the user can know which ones they've already collected, and they can't collect it again
  element.style.filter = "grayscale(90%)";
  // Play sound effect when donut is collected
  let donutSound = new Audio('audio/donut.wav'); // Looked up how to add audio here: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
  donutSound.play();
  // Remove event listener from each donut after it's been collected
  element.removeEventListener ('mouseenter', getDonutScore);
}


// Make a function that turns the game screen turn red, triggers the 'GAME OVER' pop-up, and removes event listeners from donuts, obstacles, game screen, end zone, and start zone
let setGameOver = () => {
  let obstacleSound = new Audio('audio/obstacle.mp3');
  obstacleSound.volume = 0.3; // Read about adjusting the volume of an audio clip here: https://www.w3schools.com/tags/av_prop_volume.asp
  obstacleSound.play();
  // Turn game screen background red
  let gameScreen = document.querySelector('.game-screen');
  gameScreen.style.backgroundColor = "#d00000";
  // Call pop up function with a 0.8 second delay
  setTimeout ( () => {
    makePopUp();
    // Change pop up title to 'GAME OVER'
    let popUpText = document.querySelector('.pop-up > h2');
    popUpText.textContent = 'GAME OVER';
    // Play game over sound effect
    let overSound = new Audio('audio/game-over.wav');
    overSound.play();
  }, 800);
  // Remove event listeners from each donut
  let donuts = document.querySelectorAll('.donut');
  for (let i = 0; i < donuts.length; i++) {
    donuts[i].removeEventListener ('mouseenter', getDonutScore);
  }
  // Remove event listeners from each obstacle
  let obstacles = document.querySelectorAll('.obstacle');
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].removeEventListener ('mouseenter', setGameOver);
  }
  // Remove event listener from the game screen
  gameScreen.removeEventListener ('mouseleave', setGameOver);
  // Remove event listener from the end zone
  let endZone = document.querySelector('#end-zone');
  endZone.removeEventListener ('click', setLevelCleared);
  // Remove event listener from the start zone
  let startZone = document.querySelector('#start-zone');
  startZone.removeEventListener ('click', setLevelCleared);
}


// Make a function that triggers the 'Level cleared!' or 'Game cleared!' pop up, and removes event listeners from donuts, obstacles, game screen, end zone, and start zone
let setLevelCleared = () => {
  // if current level is less than 5, say 'Level cleared!'
  if (currentLevel < 5) {
    // Pop up function with a 1 second delay
    setTimeout ( () => {
      makePopUp();
      // Change pop up title 'Level cleared!'
      let popUpText = document.querySelector('.pop-up > h2');
      popUpText.textContent = 'LEVEL CLEARED!';
      // Play sound effect when level cleared
      let clearedSound = new Audio('audio/level-cleared.wav');
      clearedSound.play();
    }, 500);
  // Otherwise, 'Game cleared!'
  } else {
    // Pop up function with a 1 second delay
    setTimeout ( () => {
      makePopUp();
      // Change pop up title 'Game cleared!'
      let popUpText = document.querySelector('.pop-up > h2');
      popUpText.textContent = 'GAME CLEARED!';
      // Play sound effect when level cleared
      let gameSound = new Audio('audio/game-cleared.mp3');
      gameSound.play();
    }, 500);
  }
  // Remove event listeners from each donut
  let donuts = document.querySelectorAll('.donut');
  for (let i = 0; i < donuts.length; i++) {
    donuts[i].removeEventListener ('mouseenter', getDonutScore);
  }
  // Remove event listeners from the obstacles
  let obstacles = document.querySelectorAll('.obstacle');
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].removeEventListener ('mouseenter', setGameOver);
  }
  // Remove event listener from the game screen
  let gameScreen = document.querySelector('.game-screen');
  gameScreen.removeEventListener ('mouseleave', setGameOver);
  // Remove event listener from end zone
  let endZone = document.querySelector('#end-zone');
  endZone.removeEventListener ('click', setLevelCleared);
  // Remove event listener from start zone
  let startZone = document.querySelector('#start-zone');
  startZone.removeEventListener ('click', setLevelCleared);
}


// Make a function that adds event listeners to the end zone, game screen, obstacles, and donuts
let startGame = () => {
  // Add event listener to end zone
  let endZone = document.querySelector('#end-zone');
  endZone.addEventListener ('click', setLevelCleared);
  // Add event listener to the game screen
  let gameScreen = document.querySelector('.game-screen');
  gameScreen.addEventListener ('mouseleave', setGameOver);
  // Add event listeners to each obstacle
  let obstacles = document.querySelectorAll('.obstacle');
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].addEventListener ('mouseenter', setGameOver);
  }
  // Add event listeners to each donut
  let donuts = document.querySelectorAll('.donut');
  for (let i = 0; i < donuts.length; i++) {
    donuts[i].addEventListener ('mouseenter', getDonutScore);
  }
  // If pop up exists, turn off event listeners to prevent users from adding to score after game over
  if (document.getElementById('pop-up-div')) {
    console.log('pop up!');
    // Remove event listeners from each donut
    for (let i = 0; i < donuts.length; i++) {
      donuts[i].removeEventListener ('mouseenter', getDonutScore);
    }
    // Remove event listeners from the obstacles
    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].removeEventListener ('mouseenter', setGameOver);
    }
    // Remove event listener from the game screen
    gameScreen.removeEventListener ('mouseleave', setGameOver);
    // Remove event listener from end zone
    endZone.removeEventListener ('click', setLevelCleared);
    // Remove event listener from start zone
    let startZone = document.querySelector('#start-zone');
    startZone.removeEventListener ('click', setLevelCleared);
  }
}


// Make a function that creates all the elements for level one
let makeLevelOne = () => {
  // Set current level variable to 1
  currentLevel = 1;
  // Create all the elements for level 1 + append
  let $levelOnePage = $('<div class="level-one"> <nav class="information-bar"> <a href="index.html"> <h2 class="title">DONUT TOUCH</h2> </a> <a class="nav-level"> <h2 class="title">LEVEL ONE</h2> </a> <h2 class="score-content" id="user-score">0000</h2> <h2 class="score-content" id="username"> </h2> </nav><section class="game-screen"> <span class="start-end-zone" id="start-zone">START</span> <span class="obstacle"> </span> <span class="obstacle"> </span> <span class="obstacle"> </span> <span class="obstacle"> </span> <span class="obstacle"> </span> <span class="obstacle"> </span> <img class="donut" src="img/donut.png" alt="donut icon" points="10"> <img class="donut" src="img/donut.png" alt="donut icon" points="10"> <span class="start-end-zone" id="end-zone">END</span> </section> </div>');
  $body.html($levelOnePage);
  // Display the username in the nav bar
  displayUsername();
  // Add event listener to start zone
  let startZone = document.querySelector('#start-zone');
  startZone.addEventListener ('click', startGame);
  // // Add event listener to nav bar level name
  // let navLevel = document.querySelector('.nav-level');
  // navLevel.addEventListener ('click', makeLevelsPage);
}


// Make a function that creates all the elements for level two
let makeLevelTwo = () => {
  // Set current level variable to 2
  currentLevel = 2;
  // Create all the elements for level 2 + append
  let $levelTwoPage = $('<div class="level-two"> <nav class="information-bar"> <a href="index.html"> <h2 class="title">DONUT TOUCH</h2> </a> <a class="nav-level"> <h2 class="title">LEVEL TWO</h2> </a> <h2 class="score-content" id="user-score">0000</h2> <h2 class="score-content" id="username"> </h2> </nav> <section class="game-screen"> <span class="start-end-zone" id="start-zone">START</span> <span class="obstacle"> </span> <span class="obstacle"> </span> <span class="obstacle"> </span> <span class="obstacle"> </span> <img class="donut" src="img/donut.png" alt="donut icon" points="10"> <img class="donut" src="img/donut.png" alt="donut icon" points="10"> <img class="donut" src="img/donut.png" alt="donut icon" points="10"> <span class="start-end-zone" id="end-zone">END</span> </section> </div>');
  $body.html($levelTwoPage);
  // // Display the username in the nav bar
  displayUsername();
  // Add event listener to start zone
  let startZone = document.querySelector('#start-zone');
  startZone.addEventListener ('click', startGame);
  // // Add event listener to nav bar level name
  // let navLevel = document.querySelector('.nav-level');
  // navLevel.addEventListener ('click', makeLevelsPage);
}


// Make a function that creates all the elements for level three
let makeLevelThree = () => {
  // Set current level variable to 3
  currentLevel = 3;
  // Create all the elements for level 3 + append
  let $levelThreePage = $('<div class="level-three"> <nav class="information-bar"> <a href="index.html"> <h2 class="title">DONUT TOUCH</h2> </a> <a class="nav-level"> <h2 class="title">LEVEL THREE</h2> </a> <h2 class="score-content" id="user-score">0000</h2> <h2 class="score-content" id="username"> </h2> </nav> <section class="game-screen"> <span class="start-end-zone" id="start-zone">START</span> <span class="obstacle"> </span> <span class="obstacle"> </span> <span class="obstacle"> </span> <span class="obstacle"> </span><img class="donut" src="img/donut.png" alt="donut icon" points="10"> <img class="donut" src="img/donut.png" alt="donut icon" points="10"> <img class="donut" src="img/donut.png" alt="donut icon" points="10"> <span class="start-end-zone" id="end-zone">END</span> </section> </div>');
  $body.html($levelThreePage);
  // Display the username in the nav bar
  displayUsername();
  // Add event listener to start zone
  let startZone = document.querySelector('#start-zone');
  startZone.addEventListener ('click', startGame);
  // // Add event listener to nav bar level name
  // let navLevel = document.querySelector('.nav-level');
  // navLevel.addEventListener ('click', makeLevelsPage);
}


// Make a function that creates all the elements for level four
let makeLevelFour = () => {
  // Set current level variable to 4
  currentLevel = 4;
  // Create all the elements for level 4 + append
  let $levelFourPage = $('<div class="level-four"> <nav class="information-bar"> <a href="index.html"> <h2 class="title">DONUT TOUCH</h2> </a> <a class="nav-level"> <h2 class="title">LEVEL FOUR</h2> </a> <h2 class="score-content" id="user-score">0000</h2> <h2 class="score-content" id="username"> </h2> </nav> <section class="game-screen"> <span class="start-end-zone" id="start-zone">START</span> <svg width="1280px" height="590px"> <image xlink:href="img/maze.svg" src="img/maze.svg" alt="maze obstacle" width="1280px" height="590px"> </svg> <img class="donut" src="img/donut.png" alt="donut icon" points="10"> <img class="donut" src="img/donut.png" alt="donut icon" points="10"> <img class="donut" src="img/donut.png" alt="donut icon" points="10"> <img class="donut" src="img/donut.png" alt="donut icon" points="10"> <img class="donut" src="img/donut.png" alt="donut icon" points="10"> <span class="start-end-zone" id="end-zone">END</span> </section> </div>');
  $body.html($levelFourPage);
  // Display the username in the nav bar
  displayUsername();
  // Add event listener to start zone
  let startZone = document.querySelector('#start-zone');
  startZone.addEventListener ('click', startGame);
  // // Add event listener to nav bar level name
  // let navLevel = document.querySelector('.nav-level');
  // navLevel.addEventListener ('click', makeLevelsPage);
}


// Make a function that creates all the elements for level five
let makeLevelFive = () => {
  // Set current level variable to 5
  currentLevel = 5;
  // Create all the elements for level 4 + append
  let $levelFivePage = $('<div class="level-five"> <nav class="information-bar"> <a href="index.html"> <h2 class="title">DONUT TOUCH</h2> </a> <a> <h2 class="title">LEVEL FIVE</h2> </a> <h2 class="score-content" id="user-score">0000</h2> <h2 class="score-content" id="username"></h2> </nav> <section class="game-screen"> <span class="start-end-zone" id="start-zone">START</span> <span class="obstacle"></span> <span class="obstacle"></span> <span class="obstacle"></span> <span class="obstacle"></span> <span class="obstacle"></span> <span class="obstacle"></span> <span class="obstacle"></span> <span class="obstacle"></span> <span class="obstacle"></span> <img class="donut" src="img/donut.png" alt="donut icon" points="10"> <img class="donut" src="img/donut.png" alt="donut icon" points="10"> <img class="donut" src="img/donut.png" alt="donut icon" points="10"> <img class="donut" src="img/donut.png" alt="donut icon" points="10"> <img class="donut" src="img/donut.png" alt="donut icon" points="10"> <span class="start-end-zone" id="end-zone">END</span> </section> </div>');
  $body.html($levelFivePage);
  // Display the username in the nav bar
  displayUsername();
  // Add event listener to start zone
  let startZone = document.querySelector('#start-zone');
  startZone.addEventListener ('click', startGame);
  // // Add event listener to nav bar level name
  // let navLevel = document.querySelector('.nav-level');
  // navLevel.addEventListener ('click', makeLevelsPage);
}


// Make a function that creates the elements for the levels page and adds event listeners to each level button
let makeLevelsPage = () => {
  $levelsPage = $('<a href="index.html"> <h1>DONUT TOUCH</h1> </a> <div class="levels"> <p>Select a level:</p> <a class="button one">LEVEL ONE</a> <a class="button two">LEVEL TWO</a> <a class="button three">LEVEL THREE</a> <a class="button four">LEVEL FOUR</a> <a class="button five">LEVEL FIVE</a> </div>')
  $main.html($levelsPage);
  // Add event listener to level one button
  let oneButton = document.querySelector('.one');
  oneButton.addEventListener ('click', makeLevelOne);
  // Add event listener to level two button
  let twoButton = document.querySelector('.two');
  twoButton.addEventListener ('click', makeLevelTwo);
  // Add event listener to level three button
  let threeButton = document.querySelector('.three');
  threeButton.addEventListener ('click', makeLevelThree);
  // Add event listener to level four button
  let fourButton = document.querySelector('.four');
  fourButton.addEventListener ('click', makeLevelFour);
  // Add event listener to level five button
  let fiveButton = document.querySelector('.five');
  fiveButton.addEventListener ('click', makeLevelFive);
}


// Add event listener to play button to make the levels page
playButton.addEventListener ('click', makeLevelsPage);

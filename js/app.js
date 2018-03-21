console.log('app.js linked!');


// Make a variable for the page body
let $body = $('body');
// Make a variable to store the user's score
let score = '';
// Make a variavle to store the current level being played
let currentLevel = '';
// Make a variable to store the user's inputted username
let username = '';
// Make variables for the play button
let playButton = document.querySelector('.play-button');


// Make a function that takes the user's inputted username and places it in the username variable so it can be used later
let storeUsername = () => {
  let userInput = document.querySelector('.input');
  username = userInput.value;
  console.log(username);
  // Remove event listener from the document body once username has been stored
  document.removeEventListener ('keydown', submitOnEnter);
}


// Make a function that takes the value of username and displays it in the nav bar once the DOM element has been created
let displayUsername = () => {
  let navUsername = document.querySelector('#username');
  navUsername.textContent = username;
}


// Make a function that removes all event listeners
let removeEventListers = () => {
  // Remove event listener from each donut
  let donuts = document.querySelectorAll('.donut');
  for (let i = 0; i < donuts.length; i++) {
    donuts[i].removeEventListener ('mouseenter', getDonutScore);
  }
  // Remove event listener from each obstacle
  let obstacles = document.querySelectorAll('.obstacle');
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].removeEventListener ('mouseenter', setGameOver);
  }
  // Remove event listener from the game screen
  let gameScreen = document.querySelector('.game-screen');
  gameScreen.removeEventListener ('mouseleave', setGameOver);
  // Remove event listener from the end zone
  let endZone = document.querySelector('#end-zone');
  endZone.removeEventListener ('click', setLevelCleared);
  // Remove event listener from the start zone
  let startZone = document.querySelector('#start-zone');
  startZone.removeEventListener ('click', setLevelCleared);
}


// Make a function that creates a pop up
let makePopUp = () => {
  console.log('level: ' + currentLevel + ', score: ' + score);
  // If the user gets no donuts, display a score of 0000
  if (score === '') {
    score = addZeroes(0);
  }
  // If pop up already exists, do nothing
  if (document.getElementById('pop-up-div')) {
    console.log('pop up already exists!');
  // Otherwise make a pop up!
  } else {
    // Create and append pop up elements
    let $popUp = $(`
      <section class="pop-up" id="pop-up-div">
        <h2></h2>
        <a class="button current-level">Play again</a>
        <a class="button next-level">Next level</a>
        <a class="button" href="index.html">Return to menu</a>
        <p>Score: ${score}</p>
      </section>
    `);
    $body.append($popUp);
    // Add links to current and next level pop up buttons depending on what level is currently being played by the user
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
        next.textContent = 'Previous levels';
        break;
    }
    // If play again button is clicked, clear the score
    current.addEventListener ('click', function (evt) {
      score = addZeroes(0);
    });
    // If next level button is clicked, clear the score
    next.addEventListener ('click', function (evt) {
      score = addZeroes(0);
    });
  }
}


// Make a function that adds zeroes to the front of the user's score
// After trying to concatenate strings and failing, I found a solution on stack overflow that utilizes slice, but I modified it to work with just 4 digits: https://stackoverflow.com/questions/30490968/adding-zeros-in-front-of-a-string
let addZeroes = (score) => {
  return ("0000" + score).slice(-4);
}


// Make a function that calculates the user's score, updates the score variable, turns donut grey, makes donut sound, and removes the event listener from donut once clicked
let getDonutScore = (evt) => {
  let element = evt.target;
  let userScore = document.querySelector('#user-score');
  let donutPoints = element.getAttribute('points');
  let currentScore = userScore.textContent;
  let newScore = Number(currentScore) + Number(donutPoints);
  userScore.textContent = addZeroes(newScore);
  // Update score variable for the pop up
  score = userScore.textContent;
  // Grey out the donut once it's been collected so the user can know which ones they've already collected, and they can't collect it again
  element.style.filter = "grayscale(90%)";
  // Play sound effect when donut is collected
  let donutSound = new Audio('audio/donut.wav'); // Looked up how to add audio here: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
  donutSound.play();
  // Remove event listener from each donut after it's been collected
  element.removeEventListener ('mouseenter', getDonutScore);
}


// Make a function that plays the game over sound, turns the game screen red, triggers the 'GAME OVER' pop-up, and removes event listeners from donuts, obstacles, game screen, end zone, and start zone
let setGameOver = () => {
  let obstacleSound = new Audio('audio/obstacle.mp3');
  obstacleSound.volume = 0.2; // Read about adjusting the volume of an audio clip here: https://www.w3schools.com/tags/av_prop_volume.asp
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
  }, 700);
  removeEventListers();
}


// Make a function that plays the end zone and level cleared sounds, triggers the 'Level cleared!' or 'Game cleared!' pop up, and removes event listeners from donuts, obstacles, game screen, end zone, and start zone
let setLevelCleared = () => {
  // Play sound effect to indicate the end zone has been pressed
  let endSound = new Audio('audio/menu.wav');
  endSound.play();
  // If current level is less than 5, pop up says 'Level cleared!'
  if (currentLevel < 5) {
    // Pop up function with a 0.7 second delay
    setTimeout ( () => {
      makePopUp();
      // Change pop up title 'Level cleared!'
      let popUpText = document.querySelector('.pop-up > h2');
      popUpText.textContent = 'LEVEL CLEARED!';
      // Play sound effect when level cleared
      let clearedSound = new Audio('audio/level-cleared.wav');
      clearedSound.play();
    }, 700);
  // Otherwise, pop up says 'Game cleared!'
  } else {
    // Pop up function with a 0.7 second delay
    setTimeout ( () => {
      makePopUp();
      // Change pop up title 'Game cleared!'
      let popUpText = document.querySelector('.pop-up > h2');
      popUpText.textContent = 'GAME CLEARED!';
      // Play sound effect when game cleared
      let gameSound = new Audio('audio/game-cleared.mp3');
      gameSound.volume = 0.2;
      gameSound.play();
    }, 700);
  }
  removeEventListers();
}


// Make a function that adds event listeners to the start zone, end zone, game screen, obstacles, and donuts, but if a pop up already exists, will remove the event listeners
let startGame = () => {
  // Play sound effect to indicate the start zone has been pressed
  let startSound = new Audio('audio/menu.wav');
  startSound.play();
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
  // Add event listener to each donut
  let donuts = document.querySelectorAll('.donut');
  for (let i = 0; i < donuts.length; i++) {
    donuts[i].addEventListener ('mouseenter', getDonutScore);
  }
  // If pop up exists, turn off event listeners to prevent users from adding to score after game over
  if (document.getElementById('pop-up-div')) {
    removeEventListers();
  }
}


// Make a function that creates all the elements for level five
let makeLevelFive = () => {
  // Set current level variable to 5
  currentLevel = 5;
  // Create all the elements for level 5 and append to body
  let $levelFivePage = $(`
    <div class="level-five">
      <nav class="information-bar">
        <a href="index.html">
          <h2 class="title">DONUT TOUCH</h2>
        </a>
        <a class="nav-level">
          <h2 class="title">LEVEL FIVE</h2>
        </a>
        <h2 class="score-content" id="user-score">0000</h2>
        <h2 class="score-content" id="username"></h2>
      </nav>
      <section class="game-screen">
        <span class="start-end-zone" id="start-zone">START</span> <span class="obstacle"></span>
        <span class="obstacle"></span>
        <span class="obstacle"></span>
        <span class="obstacle"></span>
        <span class="obstacle"></span>
        <span class="obstacle"></span>
        <span class="obstacle"></span>
        <span class="obstacle"></span>
        <span class="obstacle"></span>
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <span class="start-end-zone" id="end-zone">END</span>
      </section>
    </div>
  `);
  $body.html($levelFivePage);
  // Display the username in the nav bar
  displayUsername();
  // Add event listener to start zone
  let startZone = document.querySelector('#start-zone');
  startZone.addEventListener ('click', startGame);
  // Add event listener to nav bar level name
  let navLevel = document.querySelector('.nav-level');
  navLevel.addEventListener ('click', makeLevelsPage);
}


// Make a function that creates all the elements for level four
let makeLevelFour = () => {
  // Set current level variable to 4
  currentLevel = 4;
  // Create all the elements for level 4 and append to body
  let $levelFourPage = $(`
    <div class="level-four">
      <nav class="information-bar">
        <a href="index.html">
          <h2 class="title">DONUT TOUCH</h2>
        </a>
        <a class="nav-level">
          <h2 class="title">LEVEL FOUR</h2>
        </a>
        <h2 class="score-content" id="user-score">0000</h2>
        <h2 class="score-content" id="username"></h2>
      </nav>
      <section class="game-screen">
        <span class="start-end-zone" id="start-zone">START</span> <span class="obstacle"></span>
        <span class="obstacle"></span>
        <span class="obstacle"></span>
        <span class="obstacle"></span>
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <span class="start-end-zone" id="end-zone">END</span>
      </section>
    </div>
  `);
  $body.html($levelFourPage);
  // Display the username in the nav bar
  displayUsername();
  // Add event listener to start zone
  let startZone = document.querySelector('#start-zone');
  startZone.addEventListener ('click', startGame);
  // Add event listener to nav bar level name
  let navLevel = document.querySelector('.nav-level');
  navLevel.addEventListener ('click', makeLevelsPage);
}


// Make a function that creates all the elements for level three
let makeLevelThree = () => {
  // Set current level variable to 3
  currentLevel = 3;
  // Create all the elements for level 3 and append to body
  let $levelThreePage = $(`
    <div class="level-three">
      <nav class="information-bar">
        <a href="index.html">
          <h2 class="title">DONUT TOUCH</h2>
        </a>
        <a class="nav-level">
          <h2 class="title">LEVEL THREE</h2>
        </a>
        <h2 class="score-content" id="user-score">0000</h2>
        <h2 class="score-content" id="username"></h2>
      </nav>
      <section class="game-screen">
        <span class="start-end-zone" id="start-zone">START</span> <span class="obstacle"></span>
        <span class="obstacle"></span>
        <span class="obstacle"></span>
        <span class="obstacle"></span>
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <span class="start-end-zone" id="end-zone">END</span>
      </section>
    </div>
  `);
  $body.html($levelThreePage);
  // Display the username in the nav bar
  displayUsername();
  // Add event listener to start zone
  let startZone = document.querySelector('#start-zone');
  startZone.addEventListener ('click', startGame);
  // Add event listener to nav bar level name
  let navLevel = document.querySelector('.nav-level');
  navLevel.addEventListener ('click', makeLevelsPage);
}


// Make a function that creates all the elements for level two
let makeLevelTwo = () => {
  // Set current level variable to 2
  currentLevel = 2;
  // Create all the elements for level 2 and append to body
  let $levelTwoPage = $(`
    <div class="level-two">
      <nav class="information-bar">
        <a href="index.html">
          <h2 class="title">DONUT TOUCH</h2>
        </a>
        <a class="nav-level">
          <h2 class="title">LEVEL TWO</h2>
        </a>
        <h2 class="score-content" id="user-score">0000</h2>
        <h2 class="score-content" id="username"></h2>
      </nav>
      <section class="game-screen">
        <span class="start-end-zone" id="start-zone">START</span> <span class="obstacle"></span>
        <span class="obstacle"></span>
        <span class="obstacle"></span>
        <span class="obstacle"></span>
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <span class="start-end-zone" id="end-zone">END</span>
      </section>
    </div>
  `);
  $body.html($levelTwoPage);
  // Display the username in the nav bar
  displayUsername();
  // Add event listener to start zone
  let startZone = document.querySelector('#start-zone');
  startZone.addEventListener ('click', startGame);
  // Add event listener to nav bar level name
  let navLevel = document.querySelector('.nav-level');
  navLevel.addEventListener ('click', makeLevelsPage);
}


// Make a function that creates all the elements for level one
let makeLevelOne = () => {
  // Set current level variable to 1
  currentLevel = 1;
  // Create all the elements for level 1 and append to body
  let $levelOnePage = $(`
    <div class="level-one">
      <nav class="information-bar">
        <a href="index.html">
          <h2 class="title">DONUT TOUCH</h2>
        </a>
        <a class="nav-level">
          <h2 class="title">LEVEL ONE</h2>
        </a>
        <h2 class="score-content" id="user-score">0000</h2>
        <h2 class="score-content" id="username"></h2>
      </nav>
      <section class="game-screen">
        <span class="start-end-zone" id="start-zone">START</span> <span class="obstacle"></span>
        <span class="obstacle"></span>
        <span class="obstacle"></span>
        <span class="obstacle"></span>
        <span class="obstacle"></span>
        <span class="obstacle"></span>
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <img class="donut" src="img/donut.png" alt="donut icon" points="10">
        <span class="start-end-zone" id="end-zone">END</span>
      </section>
    </div>
  `);
  $body.html($levelOnePage);
  // Display the username in the nav bar
  displayUsername();
  // Add event listener to start zone
  let startZone = document.querySelector('#start-zone');
  startZone.addEventListener ('click', startGame);
  // Add event listener to nav bar level name
  let navLevel = document.querySelector('.nav-level');
  navLevel.addEventListener ('click', makeLevelsPage);
}


// Make a function that creates the elements for the levels page and adds event listeners to each level button
let makeLevelsPage = () => {
  // Create all the elements for the levels page and append to body
  $levelsPage = $(`
    <main class="container">
      <a href="index.html">
        <h1>DONUT TOUCH</h1>
      </a>
      <div class="levels">
        <p>Select a level:</p>
        <a class="button one">LEVEL ONE</a>
        <a class="button two">LEVEL TWO</a>
        <a class="button three">LEVEL THREE</a>
        <a class="button four">LEVEL FOUR</a>
        <a class="button five">LEVEL FIVE</a>
      </div>
    </main>`);
  $body.html($levelsPage);
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


// Add event listener to the play button to store the username
playButton.addEventListener('click', storeUsername);


// Add event listener to the play button to create the levels page
playButton.addEventListener ('click', makeLevelsPage);


// Make a function that will also store the username and create the levels page with the enter key
let submitOnEnter = evt => {
  var key = evt.which;
  if (key === 13) {
    storeUsername();
    makeLevelsPage();
  }
}

// Add event listener to the document body
document.addEventListener ('keydown', submitOnEnter);

"use strict";

//---------------------- Global variables ---------------------- 
var splashScreen;
var gameScreen;
var gameOverScreen;
var instructionScreen;

//---------------------- Build and destroy current DOM ---------------------- 
function buildDom (html) {
  var target = document.querySelector(".container"); 
  target.innerHTML = html; 
  return target; 
} 
function destroyDom (target) {
  target.innerHTML = ""; 
}
function updateHighScore () {
  var highscoreTag = document.getElementById("highscore");
  highscoreTag.innerHTML = "";
  var highscore = document.createElement("h1");
  highscoreTag.appendChild(highscore);
  return highscore.innerHTML = "HIGHSCORE : " + window.localStorage.getItem("highscore" || "");
}
//---------------------- Build the 3 different screens and transitions---------------------- 
function loadSplashScreen () {
  splashScreen = buildDom (`
    <div class="splash-screen">
      <iframe src="./music/splash.mp3" allow="autoplay" style="display:none" id="iframeAudio">
      </iframe> 
      <img id="background" src="./images/gameScreen.png" alt="splash-screen">
      <h1 id="title">SUPER MARIO</h1>
      <h1 id="title2">RACCOON</h1>
      <button id="instructions-button"> GAME INSTRUCTIONS </button>
      <button id="start-button">CLICK HERE TO START</button>
      <span id="highscore"></span>
      <span id="copyright">Designed & Developed by Ranieri Galasso</span>
    </div>
  `);
  updateHighScore();
  splashScreen.querySelector("#start-button").addEventListener("click", function () {
    destroyDom(splashScreen);
    loadGameScreen();
  });
  splashScreen.querySelector("#instructions-button").addEventListener("click", function () {
    destroyDom(splashScreen);
    loadInstructionScreen();
  });
}
function loadInstructionScreen () {
  instructionScreen = buildDom (`
    <div class="instructions-screen">
      <h1>GAME INSTRUCTIONS</h1>
      <ul>
        <li>FLY MARIO BY PRESSING DOWN 'SPACEBAR'</li>
        <li>MARIO HAS '3' LIVES, AVOID COLLIDING WITH 'MISSILES' IN ORDER TO NOT LOSE LIVES</li>
        <li>THE GAME IS OVER WHEN MARIO LOSES ALL OF HIS LIVES OR FALLS </li>
        <li>CATCH THE 'MUSHROOMS' TO GAIN A LIFE</li>
        <li>CATCH AS MANY 'STARS' AS YOU CAN, TO SET NEW HIGHSCORES</li>
      </ul>
      <button id="back-button"> BACK </button>
    </div>
    <span id="copyright">Designed & Developed by Ranieri Galasso</span>
  `);
  instructionScreen.querySelector("#back-button").addEventListener("click", function () {
    destroyDom(instructionScreen);
    loadSplashScreen();
  });
}
function gameIsOver () {
  destroyDom(gameScreen);
  loadGameOverScreen();
}
function loadGameScreen () {
  gameScreen = buildDom(`
    <div class="game-screen">
      <iframe src="./music/game.mp3" allow="autoplay" style="display:none" id="iframeAudio">
      </iframe> 
      <div class="spans">
        <span id="hearts"></span>
        <span id="points"></span>     
      </div> 
      <canvas id="canvas" width="1100" height="700"></canvas>
      <span id="copyright">Designed & Developed by Ranieri Galasso</span>
    </div>
  `);
  
  var canvas = document.getElementById("canvas");
  var game = new Game(canvas);
  

  game.gameIsOverCallback(gameIsOver);

  var onSpaceBar = function (event) {
    if(event.keyCode === 32){
      game.spaceBar();
    }
  }

  document.addEventListener("keydown", onSpaceBar);
  game.startGame();

}
function loadGameOverScreen () {
  gameOverScreen = buildDom (`
    <div class="game-over-screen">
      <iframe src="./music/gameover.mp3" allow="autoplay" style="display:none" id="iframeAudio">
      </iframe> 
      <img src="./images/gameOverScreen.jpg" alt="game-over-screen">
      <button id="home-button"> BACK HOME </button>
      <button id="restart-button">RESTART</button>
      <span id="copyright">Designed & Developed by Ranieri Galasso</span>
    </div>
  `);
  gameOverScreen.querySelector("#restart-button").addEventListener("click", function () {
    destroyDom(gameOverScreen);
    loadGameScreen();
  });
  gameOverScreen.querySelector("#home-button").addEventListener("click", function () {
    destroyDom(gameOverScreen);
    loadSplashScreen();
  });
}

//---------------------- Load the splashscreen on website load ---------------------- 
function loadGame () {
  loadSplashScreen();
}

//---------------------- Starting website load ---------------------- 
window.addEventListener("load",loadGame);





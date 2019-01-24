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
      <h1 id="title">SUPER MARIO</h1>
      <h1 id="title2">RACCOON</h1>
      <button id="instructions-button"> GAME INSTRUCTIONS </button>
      <button id="start-button">CLICK HERE TO START</button>
      <span id="highscore"></span>
    </div>
    <span id="copyright">Designed & Developed by Ranieri Galasso</span>
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
        <li>SUPER MARIO HAS '3' LIVES TO START WITH </li>
        <li>YOU CAN FLY MARIO BY PRESSING DOWN THE 'SPACE-BAR'</li>
        <li>AVOID COLLIDING WITH 'MISSILES', 'GHOSTS' OR 'PIRANHAS TO AVOID LOSING LIVES</li>
        <li>THE GAME IS OVER WHEN MARIO LOSES ALL OF HIS LIVES OR FALLS </li>
        <li>CATCH AS MANY 'MUSHROOMS' TO GAIN A LIFE</li>
        <li>CATCH AS MANY 'STARS' AS YOU CAN, TO SET NEW HIGHSCORES</li>
        <li>THERE ARE 3 DIFFERENT LEVELS OF DIFFICULTY</li>
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
    <div class="spans">
      <span id="hearts"></span>
      <span id="points"></span>
      <span id="level"> </span>
    </div> 
    <div class="game-screen">
      <iframe src="./music/game.mp3" allow="autoplay" style="display:none" id="iframeAudio">
      </iframe> 
      <canvas id="canvas" width="900" height="600"></canvas>
    </div>
    <span id="copyright">Designed & Developed by Ranieri Galasso</span>
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
      <h1>GAME OVER</h1>
      <button id="home-button"> BACK HOME </button>
      <button id="restart-button">RESTART</button>
    </div>
    <span id="copyright">Designed & Developed by Ranieri Galasso</span>
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





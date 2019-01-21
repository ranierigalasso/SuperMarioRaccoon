"use strict";

//---------------------- Global variables ---------------------- 
var splashScreen;
var gameScreen;
var gameOverScreen;

//---------------------- Build and destroy current DOM ---------------------- 
function buildDom (html) {
  var target = document.querySelector(".container"); 
  target.innerHTML = html; 
  return target; 
} 
function destroyDom (target) {
  target.innerHTML = ""; 
}

//---------------------- Build the 3 different screens and transitions---------------------- 
function loadSplashScreen () {
  splashScreen = buildDom (`
    <div class="splash-screen">
      <img id="background" src="./images/splashScreen.jpg" alt="splash-screen">
      <img id="title" src="./images/title.png" alt="splash-title">
      <button id="start-button">CLICK HERE TO START</button>
    </div>
  `);
  splashScreen.querySelector("#start-button").addEventListener("click", function () {
    destroyDom(splashScreen);
    loadGameScreen();
  });
}
function gameIsOver () {
  destroyDom(gameScreen);
  loadGameOverScreen();
}
function loadGameScreen () {
  gameScreen = buildDom(`
    <div class="game-screen">
      <span id="hearts"></span>
      <canvas id="canvas" width="800" height="800"></canvas>
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
      <img src="./images/gameOverScreen.jpg" alt="game-over-screen">
      <button id="restart-button">RESTART</button>
    </div>
  `);
  gameOverScreen.querySelector("#restart-button").addEventListener("click", function () {
    destroyDom(gameOverScreen);
    loadGameScreen();
  });
}

//---------------------- Load the splashscreen on website load ---------------------- 
function loadGame () {
  loadSplashScreen();
}

//---------------------- Starting website load ---------------------- 
window.addEventListener("load",loadGame);


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
function loadGameScreen () {
  gameScreen = buildDom(`
    <div class="game-screen">
      <canvas id="canvas" width="800" height="800"></canvas>
      <button id="game-over">GAMEOVER</button>
    </div>
  `);

  var canvas = document.getElementById("canvas");
  var game = new Game(canvas);
  game.start();
  
  gameScreen.querySelector("#game-over").addEventListener("click", function () {
    destroyDom(gameScreen);
    loadGameOverScreen();
  });
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


"use strict";


//build Screens & load the Game (STATES TRANSITION)
function buildDom (html) {
  var target = document.querySelector(".container"); //we select the container
  target.innerHTML = html; //we change the html of the container equal to the html parameter we hand it
  return target; //we return this new html inside the container
}
function loadSplashScreen () {
  buildDom (`
    <div class="splash-screen">
      <img id="background" src="./images/splashScreen.jpg" alt="splash-screen">
      <img id="title" src="./images/title.png" alt="splash-title">
      <button>CLICK HERE TO START</button>
    </div>
  `);
}
function loadGameScreen () {
  buildDom(`
    <div class="game-screen">
      <canvas id="canvas" width="800" height="800"></canvas>
    </div>
  `);
}
function loadGameOverScreen () {
  buildDom (`
    <div class="game-over-screen">
      <img src="./images/gameOverScreen.jpg" alt="game-over-screen">
      <button>RESTART</button>
    </div>
  `);
}
function loadGame () {
  loadSplashScreen();
}

//On website load the load game function is called and the splashscreen is loaded
window.addEventListener("load",loadGame);
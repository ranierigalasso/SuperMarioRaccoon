"use strict";

//---------------------- Constructor ---------------------- 
function Game (canvas) {
  this.canvas = canvas; 
  this.ctx = canvas.getContext('2d');
  this.player = new Player(canvas);
  this.enemies = [];
  this.animation;
  this.gameOver;
}
 
//---------------------- Methods ---------------------- 
Game.prototype.drawCanvas = function () {
  this.player.draw();
  this.enemies.forEach(function (enemy) {
    enemy.draw();
  });
}
Game.prototype.createEnemies = function () {
  var speed = Math.random()*  4 + 3;
  var y = Math.random() * canvas.height;
  this.enemies.push(new Enemy(canvas, y, speed));
}
Game.prototype.clearCanvas = function () {
  this.ctx.clearRect(0, 0, canvas.width, canvas.height);
}
Game.prototype.updateGame = function () {
  this.player.update();
  //randomly create new enemies and push to array
  if(Math.random() > 0.98) {//2% probability
    this.createEnemies();
  }
  //clean up enemies if not on screen anymore
  this.enemies = this.enemies.filter(function(enemy) {
    return enemy.isInScreen();
  })
  //update enemies array
  this.enemies.forEach(function (enemy) {
    enemy.update();
    //check for collision and subtract life and delete enemy
    if (this.player.checkCollideWithEnemy(enemy)) {
      this.player.loseLife();
      enemy.delete();
    }
  }.bind(this));
}
Game.prototype.gameIsOverCallback = function (gameIsOver) {
  this.gameOver = gameIsOver;
}

Game.prototype.startGame = function () {
  function loop () {
    //update game instances
    this.updateGame();
    //clear
    this.clearCanvas();
    //paint
    this.drawCanvas();

    this.animation = window.requestAnimationFrame(loop.bind(this));

    //check for gameover
    if(this.player.isDead()) {
      console.log("gameover");
      this.gameOver();
      window.cancelAnimationFrame(this.animation);
    }
  }
  window.requestAnimationFrame(loop.bind(this));
}
Game.prototype.spaceBar = function () {
  this.player.setDirection(1);
  this.player.y -= 100;
}


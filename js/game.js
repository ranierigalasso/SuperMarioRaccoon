"use strict";

//---------------------- Constructor ---------------------- 
function Game (canvas) {
  this.canvas = canvas; 
  this.ctx = canvas.getContext('2d');
  this.player = new Player(canvas);
  this.animation;
}

//---------------------- Methods ---------------------- 
Game.prototype.drawCanvas = function () {
  this.player.draw();
}
Game.prototype.clearCanvas = function () {
  this.ctx.clearRect(0, 0, canvas.width, canvas.height);
}
Game.prototype.updateGame = function () {
  this.player.update();
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
      this.stopGame();
    }
  }
  window.requestAnimationFrame(loop.bind(this));
}
Game.prototype.spaceBar = function () {
  this.player.setDirection(1);
  this.player.y -= 100;
}
Game.prototype.stopGame = function () {
  window.cancelAnimationFrame(this.animation);
}

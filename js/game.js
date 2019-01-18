"use strict";

//---------------------- Constructor ---------------------- 
function Game (canvas) {
  this.canvas = canvas; 
  this.ctx = canvas.getContext('2d');
  this.player = new Player(canvas);
  
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
    
    window.requestAnimationFrame(loop.bind(this));
  }
  window.requestAnimationFrame(loop.bind(this));
}
Game.prototype.spaceBar = function () {
  this.player.setDirection(1);
  this.player.y -= 100;
}

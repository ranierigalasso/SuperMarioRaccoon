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
Game.prototype.start = function () {
  //paint
  this.drawCanvas();
}
Game.prototype
Game.prototype

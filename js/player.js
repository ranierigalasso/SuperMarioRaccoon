"use strict";

//---------------------- Constructor ---------------------- 
function Player (canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d'); //getContext of canvas returns methods and objects for drawing on the canvas!!
  this.lifes = 3;
  this.size = 50;
  this.x = 50;
  this.y = (canvas.height - this.size)/2; //to place mario in the middle at beggining of the game, it will change once it starts
  this.direction = 0;
  this.speed = 5;
}

//---------------------- Methods ---------------------- 
Player.prototype.draw = function () {
  this.ctx.fillRect(this.x, this.y,this.size, this.size);
}
Player.prototype
Player.prototype
Player.prototype

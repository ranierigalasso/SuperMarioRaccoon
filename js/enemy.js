"use strict";

//---------------------- Constructor ---------------------- 
function Enemy (canvas, y, speed, img = "./images/level1-icon.png") {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.x = canvas.width;
  this.y = y;
  this.size = 50;
  this.speed =speed;
  this.enemyImage = new Image();
  this.enemyImage.src = img;
}
 
//---------------------- Methods ---------------------- 
Enemy.prototype.draw = function () {
  this.ctx.drawImage(this.enemyImage, this.x, this.y, this.size, this.size);
}
Enemy.prototype.update = function () {
  this.x -= this.speed;
}
Enemy.prototype.isInScreen = function () {
  if(this.x + this.size >= 0){
    return true;
  }
}
Enemy.prototype.delete = function () {
  this.x =-999;
}
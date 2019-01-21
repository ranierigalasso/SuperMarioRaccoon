"use strict";

//---------------------- Constructor ---------------------- 
function Life (canvas, y, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.x = canvas.width;
  this.y = y;
  this.size = 50;
  this.speed = speed;
  this.enemyImage = new Image();
  this.enemyImage.src = "./images/mushroom-life.png";
}
 
//---------------------- Methods ---------------------- 
Life.prototype.draw = function () {
  this.ctx.drawImage(this.enemyImage, this.x, this.y, this.size, this.size);
}
Life.prototype.update = function () {
  this.x -= this.speed;
}
Life.prototype.isInScreen = function () {
  if(this.x + this.size >= 0){
    return true;
  }
}
Life.prototype.delete = function () {
  this.x =-999;
}
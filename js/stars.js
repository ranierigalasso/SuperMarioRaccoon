"use strict";

//---------------------- Constructor ---------------------- 
function Star (canvas, y, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.x = canvas.width;
  this.y = y;
  this.size = 50;
  this.speed = speed;
  this.enemyImage = new Image();
  this.enemyImage.src = "./images/starPoints.png";
}
 
//---------------------- Methods ---------------------- 
Star.prototype.draw = function () {
  this.ctx.drawImage(this.enemyImage, this.x, this.y, this.size, this.size);
}
Star.prototype.update = function () {
  this.x -= this.speed;
}
Star.prototype.isInScreen = function () {
  if(this.x + this.size >= 0){
    return true;
  }
}
Star.prototype.delete = function () {
  this.x =-999;
}
"use strict";

//---------------------- Constructor ---------------------- 
function Player (canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d'); //getContext of canvas returns methods and objects for drawing on the canvas!!
  this.lifes = 3;
  this.size = 50;
  this.x = 150;
  this.y = (canvas.height - this.size)/2; //to place mario in the middle at beggining of the game, it will change once it starts
  this.direction = 0;
  this.speed = 5;
  this.playerImage = new Image();
  this.playerImage.src = "./images/mario-raccoon.png";
}

//---------------------- Methods ---------------------- 
Player.prototype.draw = function () {
  this.ctx.drawImage(this.playerImage, this.x, this.y, this.size, this.size);
}
Player.prototype.update = function () {
  this.y += this.direction * this.speed;
  if (this.y <= 0) {
    //if past the top of canvas push mario down
    this.y += 10;
  } 
}
Player.prototype.setDirection = function (direction) {
  this.direction = direction;
}
Player.prototype.isDead = function () {
  if(this.lifes <= 0){
    return true;
  } else if (this.y > this.canvas.height + (this.size/2)) {
    return true;
  } else {
    return false;
  } 
}
Player.prototype.checkCollide = function(objectEncountered) {
  var collidesRight = this.x + this.size / 2 > objectEncountered.x - objectEncountered.size / 2;
  var collidesLeft = this.x - this.size / 2 < objectEncountered.x + objectEncountered.size / 2;
  var collidesTop = this.y - this.size / 2 < objectEncountered.y + objectEncountered.size / 2;
  var collideBottom = this.y + this.size / 2 > objectEncountered.y - objectEncountered.size / 2;

  return collidesRight && collidesLeft && collidesTop && collideBottom;
}

Player.prototype.updateHearts = function () { 
  var heartsTag  = document.getElementById("hearts");
  heartsTag.innerHTML = "";
  
  for(var i = 0; i < this.lifes; i++) {
    var domImage = document.createElement("img");
    domImage.src = "./images/life.png";
    heartsTag.appendChild(domImage);
  }
}
Player.prototype.gainLife = function() {
  this.lifes++;
  this.updateHearts();
  console.log(`Player lives: ${this.lifes}`);
}
Player.prototype.loseLife = function() {
  this.lifes--;
  this.updateHearts();
  console.log(`Player lives: ${this.lifes}`);
}
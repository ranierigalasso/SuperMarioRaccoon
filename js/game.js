"use strict";

//---------------------- Constructor ---------------------- 
function Game (canvas) {
  this.canvas = canvas; 
  this.ctx = canvas.getContext('2d');
  this.player = new Player(canvas);
  this.enemies = [];
  this.lifes = [];
  this.stars = []; 
  this.animation;
  this.gameOver;
  this.pointCounter = 0;
  this.seconds = 0; 
  this.interval;
  this.enemySound = new Audio("./music/enemy.wav");
  this.starSound = new Audio("./music/star.wav");
  this.lifeSound = new Audio("./music/life.wav");
}
//---------------------- Extra -----------------------
Game.prototype.timer = function () {
  this.seconds += 1;
  console.log(this.seconds);
}
//---------------------- Methods ---------------------- 
Game.prototype.drawCanvas = function () {
  this.player.draw();
  this.enemies.forEach(function (enemy) {
    enemy.draw();
  });
  this.lifes.forEach(function (life) {
    life.draw();
  });
  this.stars.forEach(function (star) { 
    star.draw();
  });
}
Game.prototype.createEnemies = function () {
  var speed = Math.random() *  4 + 5;
  var y = Math.random() * canvas.height;
  this.enemies.push(new Enemy(canvas, y, speed));
}
Game.prototype.createLifes = function () {
  var speed = Math.random() *  4 + 3;
  var y = Math.random() * canvas.height;
  this.lifes.push(new Life (canvas, y, speed));
}
Game.prototype.createStars = function () { 
  var speed = Math.random()*  4 + 3;
  var y = Math.random() * canvas.height;
  this.stars.push(new Star (canvas, y, speed));
}
Game.prototype.clearCanvas = function () {
  this.ctx.clearRect(0, 0, canvas.width, canvas.height);
}
Game.prototype.updatePoints = function () {
  var pointsTag = document.getElementById("points");
  pointsTag.innerHTML = "";
  var points = document.createElement("h1");
  pointsTag.appendChild(points);
  points.innerHTML = "Score: " + this.pointCounter;
}
Game.prototype.updateGame = function () {
  this.player.update();

  //randomly create new enemies and push to array 3 LEVELS
  if(this.seconds < 30) {
    if(Math.random() > 0.97) { //3% probability
      this.createEnemies();
    }
  } else if(this.seconds < 60) {
    if(Math.random() > 0.95) { //5% probability
      this.createEnemies();
    }
  } else if(this.seconds < 90) {
    if(Math.random() > 0.90) { //10% probability
      this.createEnemies();
    }
  }
  //randomly create new lifes and push to array
  if(Math.random() > 0.999) { //0.1% probability
    this.createLifes();
  }
  //randomly create new stars and push to array 
  if(Math.random() > 0.95) { //5% probability
    this.createStars();
  }
  //clean up enemies&lifes&stars if not on screen anymore
  this.enemies = this.enemies.filter(function(enemy) {
    return enemy.isInScreen();
  })
  this.lifes = this.lifes.filter(function(life) {
    return life.isInScreen();
  })
  this.stars = this.stars.filter(function(star) { 
    return star.isInScreen();
  })
  //update enemies array
  this.enemies.forEach(function (enemy) {
    enemy.update();
    //check for collision and subtract life and delete enemy
    if (this.player.checkCollide(enemy)) {
      this.enemySound.play();
      this.player.loseLife();
      enemy.delete();
    }
  }.bind(this));
  //update lifes array
  this.lifes.forEach(function (life) {
    life.update();
    //check for collision and add life and delete mushroom
    if (this.player.checkCollide(life)) {
      this.lifeSound.play();
      this.player.gainLife();
      life.delete();
    }
  }.bind(this));
  //update stars array
  this.stars.forEach(function (star) {  
    star.update();
    //check for collision and delete star
    if (this.player.checkCollide(star)) {
      this.starSound.play();
      this.pointCounter ++;
      this.updatePoints();
      //add to highscore if new highscore
      console.log(this.pointCounter);
      if(this.pointCounter > Number(window.localStorage.getItem("highscore" || ""))) {
        this.localScoreAdd(); 
      }
      star.delete();
    }
  }.bind(this));
}
Game.prototype.gameIsOverCallback = function (gameIsOver) {
  this.gameOver = gameIsOver;
}
Game.prototype.startGame = function () {
  this.player.updateHearts();
  this.updatePoints(); 
  this.interval = setInterval(this.timer.bind(this), 1000);

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
      clearInterval(this.interval);
      this.gameOver();
      window.cancelAnimationFrame(this.animation);
    }
  }
  window.requestAnimationFrame(loop.bind(this));
}
Game.prototype.spaceBar = function () {
  this.player.gravitySpeed = 0;
  this.player.setDirection(1);
  this.player.y -= 65;
}
Game.prototype.localScoreAdd = function () {
  return window.localStorage.setItem("highscore",JSON.stringify(this.pointCounter));
}

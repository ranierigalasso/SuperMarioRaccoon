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
  this.intervalLevel;
  this.enemySound = new Audio("./music/enemy.wav");
  this.starSound = new Audio("./music/star.wav");
  this.lifeSound = new Audio("./music/life.wav");
  this.levels = "";
}

//---------------------- Methods ---------------------- 
Game.prototype.timer = function () {
  this.seconds += 1;
}
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
    document.querySelector(".game-screen").classList.add("level2");
    if(Math.random() > 0.95) { //5% probability
      var speed = Math.random() *  4 + 5;
      var y = Math.random() * canvas.height;
      this.enemies.push(new Enemy(canvas, y, speed, "./images/level2-icon.png"));
    }
  } else if(this.seconds > 60) {
    document.querySelector(".game-screen").classList.remove("level2");
    document.querySelector(".game-screen").classList.add("level3");
    if(Math.random() > 0.95) { //5% probability but faster enemies
        var speed = Math.random() *  4 + 6;
        var y = Math.random() * canvas.height;
        this.enemies.push(new Enemy(canvas, y, speed, "./images/level3-icon.png"));
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
  //clean up enemies & lifes & stars if not on screen anymore
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
      this.enemySound.currentTime = 0;
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
      this.lifeSound.currentTime = 0;
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
      this.starSound.currentTime = 0;
      this.starSound.play();
      this.pointCounter ++;
      this.updatePoints();
      //add to highscore if new highscore
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
  this.levelSpan();
  this.intervalLevel = setInterval(this.levelSpan.bind(this),30000);

  function loop () {
    this.updateGame();
    this.clearCanvas();
    this.drawCanvas();
    this.animation = window.requestAnimationFrame(loop.bind(this));
    //check for gameover
    if(this.player.isDead()) {
      clearInterval(this.interval);
      clearInterval(this.intervalLevel);
      this.gameOver();
      window.cancelAnimationFrame(this.animation);
    }
  }
  window.requestAnimationFrame(loop.bind(this));
}
Game.prototype.spaceBar = function () {
  this.player.gravitySpeed = 0;
  this.player.setDirection(.5);
  this.player.y -= 40;
}
Game.prototype.localScoreAdd = function () {
  return window.localStorage.setItem("highscore",JSON.stringify(this.pointCounter));
}
Game.prototype.levelSpan = function () {
  if(this.seconds < 30) {
    this.levels = "LEVEL 1";
  } else if(this.seconds < 60) {
    this.levels = "LEVEL 2";
  } else if(this.seconds < 90) {
    this.levels = "LEVEL 3";
  }
  var levelsTag = document.getElementById("level");
  levelsTag.innerHTML = "";
  var level = document.createElement("h1");
  levelsTag.appendChild(level);
  level.innerHTML = this.levels;
}

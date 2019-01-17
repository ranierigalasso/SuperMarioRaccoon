# SUPER MARIO RACCOON GAME

## Description
SUPER MARIO RACCOON is a simple but addictive game where the player needs to fly Mario accross an array of obstacles, which
if collision occurs a life is taken away. The player can also collect "stars" (each coin has the value of +1) to achieve new highscores
and collect "mushrooms" (each mushroom has the value of +1) to increase its current lives.The player will start with 3 lives and will lose only once it has 0 lives.

## MVP (DOM - CANVAS)
*CANVAS*
The MVP version will be the first level of the game: a player and an array of enemies. Mario will be affected by gravity, so the 
player needs to make it fly using the space bar. Top of the canvas cannot be accessed and if Mario falls below canvas it is game over.

## Backlog
- Istructions button & screen
- Highscore (using local storage)
- Add stars and stars counter on game screen
- Add mushrooms and lives counter on game screen
- Move background image shifting to the left of the canvas
- Install appropriate font
- Add music to the game (different one for splash/game/gameover)
- With time increase difficulty and change background image (3 levels)



## Data structure
### game.js
```javascript
Game(canvas) {
  this.canvas 
  this.ctx
  this.player
  this.enemies 
}
Game.prototype.start () {
  function loop () {
    //update variables
    //clear canvas
    //paint canvas
  }
}
Game.prototype.stop () {
  //when the game is over
}
Game.prototype.fly () {
  //using space make mario fly up
}


```
### player.js
```javascript
Player(canvas, lives) {
  this.x
  this.y
  this.direction 0
  this.size
  this.speed
  this.lives
  this.canvas
  this.ctx
}
Player.prototype.setDirection() {}
Player.prototype.collidesWithEnemies() {} 
Player.prototype.loseLife() {}
Player.prototype.update() {}
Player.prototype.draw() {}
Player.prototype.isDead() {}


```
### enemy.js
```javascript
Enemy(canvas, y, speed) {
  this.x
  this.y
  this.direction 0
  this.size
  this.speed
  this.canvas
  this.ctx
}
Enemy.prototype.update()
Enemy.prototype.draw()
Enemy.prototype.isInScreen()
Enemy.prototype.die()


```


## States & State Transitions
Definition of the different states and their transition (transition functions)
```javascript
- splashScreen()
  - buildSplash()
  - addEventListener(startGame)
  
  
- starGame()
  - destroySplash()
  - create new Game()
  - game.start()
  
  
- gameOver()
  - destroyGame()
  - buildGameOver()
  - addEventListener(starGame) 
```

## Task
- create files javascript
- Main - buildDom
- Main - buildSplash
- Main - addEventListener
- Main - destroySplash
- Game - buildDom
- Game - TimeOut test
- Main - GameOver
- Main - destroy Game
- Main - GameOver RESTART
- Main - removeGameOver
- Game - addEventListener
- Game - create player
- Player - create
- Player - directions
- Game - loop
- Game - player and enemies position 
- Game - clear
- Game - create enemies
- Enemy - create
- Enemy - check if still in screen
- Game - collision + remove
- Game - lives 
- Game - gameOver

## Links


### Git
URls for the project repo and deploy
[Link Repo]()
[Link Deploy]()


### Slides
URls for the project presentation (slides)
[Link Slides.com]()


## Development 

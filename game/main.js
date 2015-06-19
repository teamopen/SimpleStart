/*global Phaser*/
//First we define our basic game container variable. This is basic boilerplate.
//Args: width, height, renderer, and div in the hosting page.
var game = new Phaser.Game(640, 640, Phaser.AUTO, 'game_div', {preload: preload, create: create, update: update});

//Load our assets
function preload(){
  game.load.image('bat', 'assets/img/paddleBlu.png');
  game.load.image('ball', 'assets/img/ballBlue.png');
  //rectangular blocks
  game.load.image('1', 'assets/img/element_green_rectangle.png');
  game.load.image('2', 'assets/img/element_red_rectangle.png');
  game.load.image('3', 'assets/img/element_blue_rectangle.png');
  //square blocks
  game.load.image('4', 'assets/img/element_green_square.png');
  game.load.image('5', 'assets/img/element_red_square.png');
  game.load.image('6', 'assets/img/element_blue_square.png');
  //Collision sound
  game.load.audio('boing', 'assets/snd/phaserUp3.ogg');
  
}
var score = 0;
var scoreText;
var blocks;
var player;
var ball;
var cursors;
var boing;
var defeat;
function create(){
  // Game initialization
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.checkCollision.down = false;
  
  // Initialize the Ball
  ball = game.add.sprite(0, 0, 'ball');
  
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  
  ball.body.bounce.set(1, 1);
  ball.body.collideWorldBounds = true;
  
  setBall();

  // Initialize the Player's paddle
  player = game.add.sprite(0, 0, 'bat');
  player.anchor.setTo(0.5, 0.5);
  game.physics.enable(player, Phaser.Physics.ARCADE);
  
  player.x = game.world.centerX - (player.width / 2);
  player.y = game.world.centerY+200;
  
  player.body.bounce.set(1);
  player.body.immovable = true;

  // Initialize the blocks
  blocks = game.add.group();
  blocks.enableBody = true;
  blocks.physicsBodyType = Phaser.Physics.ARCADE;
  
  boardgen();
  //Initialize the sound
  boing = game.add.audio('boing');
  //Score
  scoreText = game.add.text(10, 600, 'Score: 0', { fontSize: '32px', fill: '#FFFFFF' });
}

function update(){
  cursors = game.input.keyboard.createCursorKeys();
  
  // Moving to the left
  if((cursors.left.isDown || game.input.keyboard.isDown(65)) && player.x > player.width/2) {
    player.x -= 4;
  }
  
  // Moving to the right
  if((cursors.right.isDown || game.input.keyboard.isDown(68)) && player.x < game.world.width - player.width/2){
    player.x += 4;
  }
  
  game.physics.arcade.collide(ball, blocks, BallHitsBlock, null, this);
  game.physics.arcade.collide(ball, player, BallHitsPlayer, null, this);
  
  if(ball.y > player.y+200) {
    ballFalls();
  }
}

function BallHitsPlayer() { };

function BallHitsBlock(_ball, _block) {
  _block.kill();
  boing.play();
  updateScore();
}

function randomBlock() {
  var num = Math.floor((Math.random() * 5) + 1);
  
  if(num != 1) {
    num = Math.floor((Math.random() * 3) + 1);
  } else {
    num = Math.floor((Math.random() * 3) + 4);
  }
  
  return num;
}

function boardgen(){
  
  var boardState = [[randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock()],
                    [randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock()],
                    [randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock()],
                    [randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock()],
                    [randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock(), randomBlock()]];
  var block;

  for(var y = 0; y < boardState.length; y++) {
    var subtract = 0;
    for(var x = 0; x < boardState[y].length; x++) {
      block = blocks.create(x * 64 + subtract, y * 32, boardState[y][x]);
      block.body.bounce.set(1);
      block.body.immovable = true;
      
      // Moves the blocks over if there is a square
      if(boardState[y][x] > 3) {
        subtract -= 32;
        // For every two square blocks, add another random block.
        if(Math.floor(subtract/64) == subtract/64) {
          boardState[y].push(randomBlock());
        }
      }
    }
  }
  
}

function setBall() {
  
   ball.body.velocity.x = 300;
   ball.body.velocity.y = -150;
   ball.x = game.world.centerX - ball.width /2;
   ball.y = game.world.centerX + 200 - ball.height;
   
}

function ballFalls() {
  GameOver();
}

function GameOver() {
  ball.body.velocity.x = 0;
  ball.body.velocity.y = 0;
  
  game.add.text(game.world.centerX, game.world.centerY, 'You lost! Final Score: '+score, {font: '28px Arial', fill: '#ff0000', align: 'center'});

}

function updateScore() {
  
  score += 10;
  scoreText.text = 'Score: ' + score;
  
}
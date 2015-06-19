/*global Phaser*/
//First we define our basic game container variable. This is basic boilerplate.
//Args: width, height, renderer, and div in the hosting page.
var game = new Phaser.Game(640, 640, Phaser.AUTO, 'game_div', {preload: preload, create: create, update: update});

//Load our assets
function preload(){
  game.load.image('bat', 'assets/img/paddleBlu.png');
  game.load.image('ball', 'assets/img/ballBlue.png');
  game.load.image('greenBlock', 'assets/img/element_green_rectangle.png');
}

var blocks;
var player;
var ball;
var cursors;
var lives = 2;

function create(){
  // Game init
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.checkCollision.down = false;
  
  // Initialize the Ball
  ball = game.add.sprite(0, 0, 'ball');
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.body.bounce.set(1);
  ball.body.collideWorldBounds = true;
  setBall();

  //Initialize the Player's paddle
  player = game.add.sprite(0, 0, 'bat');
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.x = game.world.centerX - (player.width / 2);
  player.y = game.world.centerY+200;
  player.body.bounce.set(1);
  player.body.immovable = true;

  //Initialize the blocks
  blocks = game.add.group();
  blocks.enableBody = true;
  blocks.physicsBodyType = Phaser.Physics.ARCADE;
  
  boardgen();

}

function update(){
  cursors = game.input.keyboard.createCursorKeys();

  player.body.velocity.x = 0;
  //moving to the left
  if((cursors.left.isDown || game.input.keyboard.isDown(65)) && player.x > 0) {
    player.x -= 4;
  }
  //moving to the right
  if((cursors.right.isDown || game.input.keyboard.isDown(68)) && player.x < game.world.width - player.width){
    player.x += 4;
  }
}

function boardgen(){
  
  var unit = 32;
  
  var boardState = [['greenBlock', 'greenBlock', 'greenBlock'],
                    ['greenBlock', 'greenBlock', 'greenBlock'],
                    ['greenBlock', 'greenBlock', 'greenBlock']];
  var block;

  for(var y = 0; y < boardState.length; y++) {
    for(var x = 0; x < boardState[y].length; x++) {
      block = blocks.create(x * 64 + 32, y * 32, boardState[y][x]);
      block.body.bounce.set(1);
      block.body.immovable = true;
    }
  }
  
}

function setBall() {
  
  /* filler 
   ball.body.velocity.x =
   ball.body.velocity.y =
   ball.reset(x, y);
   */
  
}

function ballFalls() {
  lives--;
  
  if(lives == 0) {
    // Filler for game over
  } else {
    startBall()
  }
}

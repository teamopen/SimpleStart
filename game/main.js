/*global Phaser*/
//First we define our basic game container variable. This is basic boilerplate.
//Args: width, height, renderer, and div in the hosting page.
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game_div', {preload: preload, create: create, update: update});

//Load our assets
function preload(){
  game.load.image('bat', 'assets/img/paddleBlu.png');
  game.load.image('ball', 'assets/img/ballBlue.png');
  game.load.image('greenBlock', 'assets/img/element_green_rectangle.png');
}

var blocks;
var player;
var ball;

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Initialize the Ball
  ball = game.add.sprite(0, 64, 'ball');
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.body.bounce.set(1);
  ball.body.collideWorldBounds = true;
  
  //Initialize the Player's paddle
  player = game.add.sprite(0, 0, 'bat');
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.x = game.world.centerX - (player.width / 2);
  player.y = game.world.centerY - (player.Height*2);
  player.body.bounce.set(1);
  player.body.immovable = true;

  //Initialize the blocks
  blocks = game.add.group();
  game.physics.enable(blocks, Phaser.Physics.ARCADE);
  blocks.enableBody = true;
  blocks.body.bounce.set(1);
  blocks.body.immovable = true;

  for(var y = 0; y < 5; y++) {
    for(var x = 0; x < 10; x++) {
      blocks.create(x * 64 , y * 32, 'greenBlock');
    }
  }
}

function update(){

}

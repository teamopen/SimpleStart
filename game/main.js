/*global Phaser*/
//First we define our basic game container variable. This is basic boilerplate.
//Args: width, height, renderer, and div in the hosting page.
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game_div', {preload: preload, create: create, update: update});

//Load our assets
function preload(){
  game.load.image('bat', 'assets/img/paddleBlu.png');
  game.load.image('ball', 'assets/img/ballBlue.png');
}

var blocks;
var player;

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);
  
  //Initialize the Player's paddle
  player = game.add.sprite(0, 0, 'bat');
  player.x = (game.world.width / 2) - (player.width / 2);
  player.y = (game.world.height - 128);
  
  //Initialize the blocks
  blocks = game.add.group();
  blocks.enableBody = true;
  blocks.physicsBodyType = Phaser.Physics.ARCADE;
  
  var block;
  
  for(var y = 0; y < 15; y++) {
    for(var x = 0; x < 10; x++) {
      block = blocks.create(x * 64, y * 32, 'assets/img/element_green_rectangle.png')
    }
  }
}

function update(){

}
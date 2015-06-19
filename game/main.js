/*Global Phaser*/
//First we define our Basic game container variable. This is basic boilerplate.
//Args: width, height, renderer, and div in the hosting page.
var game = new Phaser.Game(480,640, Phaser.AUTO, 'game_div', {preload: preload, create: create, update: update});

//Load our assets
function preload(){
  game.load.image('bat', 'assets/img/paddleBlu.png');
  game.load.image('ball', 'assets/img/ballBlue.png');
  game.load.image('greenBlock','assets/img/element_green_rectangle.png')
}

var blocks;

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);
  blocks = game.add.group();
  blocks.enableBody = true;
  player = game.add.sprite(game.world.width / 2 - 52, game.world.height - 132, 'bat');

}
function update(){

}
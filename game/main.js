var game = new Phaser.Game(480,640, Phaser.AUTO, '', {preload: preload, create: create, update: update});

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
  //for(var i = 0;)
  player = game.add.sprite(game.world.width / 2 - 52, game.world.height - 132, 'bat');

}
function update(){

}

var game = new Phaser.Game(600, 600, Phaser.CANVAS, 'content', {
  preload: preload,
  create: create,
  update: update
});



var map;
var layer;

var cursors;
var sprite;
var fort;
var mushrooms;
var tileset_name = 'Desert';
var tileset_url = '//i.imgur.com/Ij2jFqr.png';

var thing_name = 'thing';
var thing_url = '//i.imgur.com/qnNIIOy.png';

var shroom_name = 'littleshrooms_0';
var shroom_url = '//i.imgur.com/UMJrgvX.png';

var background_name = 'Ground';
var fort_name = 'Fort';

var mummy_sprite = '//i.imgur.com/2kvTX9u.png'

var robot_sprite = '//i.imgur.com/tA898OF.png';
var boundaries;
var text;
var count = 0;
var mummy;

function preload() {

  // our tilemap
  game.load.tilemap('map', "tilemap.json", null, Phaser.Tilemap.TILED_JSON);

  // our tileset
  game.load.image(tileset_name, tileset_url);

  // our hero!
  game.load.image(thing_name, thing_url);
  game.load.image(shroom_name, shroom_url);


  game.load.spritesheet('mummy', mummy_sprite, 37, 45, 18);

game.load.spritesheet('robot', robot_sprite, 93, 158, 24);

}


function create() {

  game.physics.startSystem(Phaser.Physics.P2JS);
  cursors = game.input.keyboard.createCursorKeys();
  game.physics.p2.setImpactEvents(true);

  map = game.add.tilemap('map');
  map.addTilesetImage(tileset_name);

  var shroomcollisiongroup = game.physics.p2.createCollisionGroup();
  var playerCG = game.physics.p2.createCollisionGroup();
  var wallsCG =  game.physics.p2.createCollisionGroup();
  var mummyCG = game.physics.p2.createCollisionGroup();

  var walls = game.physics.p2.convertCollisionObjects(map, "Collisions", true);
  for(var wall in walls)
  {
    walls[wall].setCollisionGroup(wallsCG);
    walls[wall].collides(playerCG);
  }
  layer = map.createLayer(background_name);

  mushrooms = game.add.group();
  mushrooms.enableBody = true;
  mushrooms.physicsBodyType = Phaser.Physics.P2JS;

  // create some guys randomly on our world
  for (i = 0; i < 10; i++)
  {
    var shroom = mushrooms.create(game.world.randomX, game.world.randomY, shroom_name);
    shroom.body.setCollisionGroup(shroomcollisiongroup);
    shroom.body.collides([playerCG, wallsCG]);
  }

  mummy = game.add.sprite(100, 200, 'mummy');
  mummy.animations.add('walk');
  mummy.animations.play('walk', 20, true);
  game.physics.p2.enable(mummy);
  mummy.body.setCollisionGroup(mummyCG);
  mummy.body.collides(playerCG);

  sprite = game.add.sprite(250, 120, 'robot');

  game.physics.p2.enable(sprite,false);
  sprite.scale.setTo(.4,.4);
  sprite.body.setCircle(28);

  sprite.animations.add('walk');
  sprite.animations.play('walk', 20, true);



  sprite.anchor.setTo(0.5, 0.5);
  sprite.body.setCollisionGroup(playerCG);
  sprite.body.collides(mummyCG, die, this);
  sprite.body.collides(wallsCG);
  sprite.body.collides(shroomcollisiongroup,collectCoin,this);

  layer.resizeWorld();

  // game.debug = true;
  game.camera.follow(sprite);
  //game.physics.p2.createDistanceConstraint(sprite, mummy, 150);


  // create our score text in the top left corner
  text = game.add.text(game.camera.x,game.camera.y, "Score: 0", {
        font: "24px Arial",
        fill: "#ff0044",
        align: "center"
    });

}

function die(player, mummy)
{
  player.sprite.kill();
   var dieText = this.game.add.text(game.camera.width / 2, game.camera.height / 2, "Score: 0", {
        font: "48px Arial",
        fill: "#ff0044",
        align: "left"
    });
    dieText.fixedToCamera = false;
    dieText.setText("YOU DIED");

}

function updateText() {

   // This updates every frame
    text.setText("Score:" + count);

}
var mummy_speed = 20;

function followRobot()
{
  if (sprite.body.x < mummy.body.x)
  {
    mummy.body.velocity.x = mummy_speed * -1;
  }
  else
  {
    mummy.body.velocity.x = mummy_speed;
  }
    if (sprite.body.y < mummy.body.y)
  {
    mummy.body.velocity.y = mummy_speed * -1;
  }
  else
  {
    mummy.body.velocity.y = mummy_speed;
  }

}

function update() {
  // make the score text always follow where the camera is
  text.x = game.camera.x;
  text.y = game.camera.y;

  sprite.body.velocity.x = 0;
  sprite.body.velocity.y = 0;
  if (cursors.up.isDown) {
      sprite.body.velocity.y = -200;
  }

  if (cursors.left.isDown) {
    sprite.body.velocity.x = -300;
  } else if (cursors.right.isDown) {
    sprite.body.velocity.x = 300;
  } else if (cursors.up.isDown) {
    sprite.body.velocity.y = -300;
  } else if (cursors.down.isDown) {
    sprite.body.velocity.y = 300;
  }

  followRobot();


}

function collectCoin(player, coin) {
 // we touched a coin, so kill it, update our score, and then update our score text


  coin.sprite.kill();
  count++;
  updateText();

}

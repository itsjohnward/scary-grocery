var game = new Phaser.Game(600, 600, Phaser.CANVAS, 'content', {
  preload: preload,
  create: create,
  update: update
});

var map;
var layer;

var cursors;
var sprite;

var tileset_name = 'simples_pimples';
var tileset_url = 'assets/simples_pimples.png';

var background_name = 'Ground';

var boogey_sprite = '//i.imgur.com/2kvTX9u.png'

var player_sprite = '//i.imgur.com/tA898OF.png';
var boundaries;

var text;
var count = 0;
var boogey;

function preload() {
	game.load.tilemap('map', "level.json", null, Phaser.Tilemap.TILED_JSON);

    // our tileset
    game.load.image(tileset_name, tileset_url);

	game.load.spritesheet('mummy', boogey_sprite, 37, 45, 18);

	game.load.spritesheet('player', player_sprite, 93, 158, 24);
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
    var boogeyCG = game.physics.p2.createCollisionGroup();

    var walls = game.physics.p2.convertCollisionObjects(map, "Collisions", true);
    for(var wall in walls)
    {
      walls[wall].setCollisionGroup(wallsCG);
      walls[wall].collides(playerCG);
    }
    layer = map.createLayer(background_name);

	boogey = game.add.sprite(100, 200, 'mummy');
    boogey.animations.add('walk');
    boogey.animations.play('walk', 20, true);
    game.physics.p2.enable(boogey);
    boogey.body.setCollisionGroup(boogeyCG);
    boogey.body.collides(playerCG);

    sprite = game.add.sprite(250, 120, 'player');

    game.physics.p2.enable(sprite,false);
    sprite.scale.setTo(.4,.4);
    sprite.body.setCircle(28);

    sprite.animations.add('walk');
    sprite.animations.play('walk', 20, true);

    sprite.anchor.setTo(0.5, 0.5);
    sprite.body.setCollisionGroup(playerCG);
    sprite.body.collides(boogeyCG, die, this);
    sprite.body.collides(wallsCG);

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

var boogey_speed = 20;

function followRobot() {
	if (sprite.body.x < boogey.body.x) {
		boogey.body.velocity.x = boogey_speed * -1;
	}
	else {
		boogey.body.velocity.x = boogey_speed;
	}
	if (sprite.body.y < boogey.body.y) {
		boogey.body.velocity.y = boogey_speed * -1;
	}
	else {
		boogey.body.velocity.y = boogey_speed;
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
	}
	else if (cursors.right.isDown) {
		sprite.body.velocity.x = 300;
	}
	else if (cursors.up.isDown) {
		sprite.body.velocity.y = -300;
	}
	else if (cursors.down.isDown) {
		sprite.body.velocity.y = 300;
	}

	followRobot();
}

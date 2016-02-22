var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var tiled_level;

function preload() {
	game.load.image('sky', './assets/sky.png');
	game.load.image('ground', './assets/platform.png');
	game.load.image('star', './assets/star.png');
	game.load.spritesheet('dude', './assets/dude.png', 32, 48);
	game.load.tilemap('mario', 'level.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tiles', 'simples_pimples.png');
}

var shelves;
var player;
var boogey;
var keys;

var stealth_factor;

var score = 0;
var scoreText;

var dead = false;

var map;
var backgroundLayer, blockedLayer;



function create() {

	//  The 'mario' key here is the Loader key given in game.load.tilemap
    map = game.add.tilemap('mario');

    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('simples_pimples', 'tiles');

    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
	//console.log(map);
	backgroundLayer = map.createLayer('backgroundLayer');
	blockedLayer = map.createLayer('blockedLayer');
	//console.log(layer);

    //  This resizes the game world to match the layer dimensions
    backgroundLayer.resizeWorld();

	console.log(map);

	//console.log(tiled_level);
	/*
	for(var l in tiled_level.layers) {
		for(var t in l.data) {
			tile.create(t);
		}
	}
	*/

	game.physics.startSystem(Phaser.Physics.ARCADE);

	//game.add.sprite(0,0,'sky');
/*
	shelves = game.add.group();
	shelves.enableBody = true;

	var ground = shelves.create(0, game.world.height - 32, 'ground');
	ground.scale.setTo(2,2);
	ground.body.immovable = true;

	ground = shelves.create(0, 0, 'ground');
	ground.scale.setTo(0.1,32);
	ground.body.immovable = true;
	ground = shelves.create(game.world.width-32, 0, 'ground');
	ground.scale.setTo(0.1,32);
	ground.body.immovable = true;

	ground = shelves.create(0, -32, 'ground');
	ground.scale.setTo(2,2);
	ground.body.immovable = true;

	var ledge = shelves.create(200, 100, 'ground');
	ledge.body.immovable = true;
		ledge = shelves.create(200, 180, 'ground');
	ledge.body.immovable = true;
	var ledge = shelves.create(200, 260, 'ground');
	ledge.body.immovable = true;
	ledge = shelves.create(200, 340, 'ground');
	ledge.body.immovable = true;

	var ledge = shelves.create(250, 450, 'ground');
	ledge.scale.setTo(0.2,2);
	ledge.body.immovable = true;
	ledge = shelves.create(500, 450, 'ground');
	ledge.scale.setTo(0.2,2);
	ledge.body.immovable = true;
	*/
	// v PLAYER

	player = game.add.sprite(32, game.world.height - 150, 'dude');
	player.scale.setTo(0.8, 0.8);

	game.physics.arcade.enable(player);

	player.body.bounce.y = 0.2;
	player.body.collideWorldBounds = true;

	player.animations.add('left', [0,1,2,3], 10, true);
	player.animations.add('right', [5,6,7,8], 10, true);

	// ^ PLAYER | v BOOGEY

	boogey = game.add.sprite(100, game.world.height - 150, 'dude');
	boogey.scale.setTo(0.8, 0.8);

	game.physics.arcade.enable(boogey);

	boogey.body.bounce.y = 0.2;
	boogey.body.collideWorldBounds = true;

	boogey.animations.add('left', [0,1,2,3], 10, true);
	boogey.animations.add('right', [5,6,7,8], 10, true);

	// ^ BOOGEY

	keys = {
		up: game.input.keyboard.addKey(Phaser.Keyboard.W),
	    down: game.input.keyboard.addKey(Phaser.Keyboard.S),
	    left: game.input.keyboard.addKey(Phaser.Keyboard.A),
	    right: game.input.keyboard.addKey(Phaser.Keyboard.D)
	};

	scoreText = game.add.text(16, 16, 'Run!', { fontSize: '32px', fill: '#000' });


}

var tile = function() {
	var json_obj;
	var create = function(tiled_param) {
		json_obj = tiled_param;
		console.log(json_obj);
	}
}

var player = function() {
	var json_obj;
	var create = function(tiled_param) {
		json_obj = tiled_param;
		console.log(json_obj);
	}
	var move = function() {

	}
}

var boogey = function() {
	var json_obj;
	var create = function(tiled_param) {
		json_obj = tiled_param;
		console.log(json_obj);
	}
	var ai = function() {

	}
}

function update() {

}


var boogey_threshold = 20;
var boogey_move = boogey_threshold;
var boogey_speed = 4;
var randomnumber;

function boogeyAI() {

	if(boogey_move >= boogey_threshold) {
		randomnumber = Math.floor(Math.random()*5);
		boogey_move = 0;
	}
	else {
		boogey_move++;
	}

	if (randomnumber == 1) {
		boogey.body.velocity.x = -boogey_speed;
	}
	else if (randomnumber == 2) {
		boogey.body.velocity.x = boogey_speed;
	}
	else {
		boogey.animations.stop();
		boogey.frame = 4;
		boogey.body.velocity.x = 0;
	}
	if (randomnumber == 3) {
		boogey.body.velocity.y = -boogey_speed;
	}
	else if (randomnumber == 4) {
		boogey.body.velocity.y = boogey_speed;
	}
	else {
		boogey.animations.stop();
		boogey.frame = 4;
		boogey.body.velocity.y = 0;
	}
	if(!dead) {
		calculateStealth();
	}
}

function calculateStealth() {
	stealth_factor = {
		"x": Math.abs(player.body.position.x - boogey.body.position.x),
		"y": Math.abs(player.body.position.y - boogey.body.position.y)
	};
}

/*
function update() {

	game.physics.arcade.collide(player, shelves);
	game.physics.arcade.collide(boogey, shelves);

	game.physics.arcade.overlap(player, boogey, boogey_kill, null, this);

	if (keys["left"].isDown) {
		player.body.velocity.x = -150;
	}
	else if (keys["right"].isDown) {
		player.body.velocity.x = 150;
	}
	else {
		player.animations.stop();
		player.frame = 4;
		player.body.velocity.x = 0;
	}
	if (keys["up"].isDown) {
		player.body.velocity.y = -150;
	}
	else if (keys["down"].isDown) {
		player.body.velocity.y = 150;
	}
	else {
		player.animations.stop();
		player.frame = 4;
		player.body.velocity.y = 0;
	}

	boogeyAI();

}
*/

function boogey_kill(player, boogey) {
	player.kill();
	dead = true;
	scoreText.text = 'You Died';
}

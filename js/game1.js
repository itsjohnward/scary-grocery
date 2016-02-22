var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var playerCG, boogeyCG, wallsCG;
var map;
var backgroundLayer, blockedLayer;
var player, boogey;
var cursors;

function preload() {
	game.load.image('sky', './assets/sky.png');
	game.load.image('ground', './assets/platform.png');
	game.load.image('star', './assets/star.png');
	game.load.spritesheet('dude', './assets/dude.png', 32, 48);
	game.load.tilemap('store', 'level.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tiles', 'simples_pimples.png');
}

function create() {

	game.physics.startSystem(Phaser.Physics.P2JS);

	playerCG = game.physics.p2.createCollisionGroup();
	wallsCG =  game.physics.p2.createCollisionGroup();
	boogeyCG = game.physics.p2.createCollisionGroup();

	map = game.add.tilemap('store');
	map.addTilesetImage('simples_pimples', 'tiles');
	backgroundLayer = map.createLayer('backgroundLayer');
	blockedLayer = map.createLayer('blockedLayer');

	var walls = game.physics.p2.convertCollisionObjects(map, "blockedLayer", true);
	for(var wall in walls) {
		walls[wall].setCollisionGroup(wallsCG);
		walls[wall].collides(playerCG);
	}

	game.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

	player = {
		sprite: game.add.sprite(game.world.centerX, game.world.centerY, 'dude')
	}

	game.physics.p2.enable(player.sprite);
	player.sprite.body.setCollisionGroup(wallsCG);

	//game.physics.p2.enable(player.sprite);

	cursors = game.input.keyboard.createCursorKeys();

	game.camera.follow(player.sprite);
	console.log(map);
}

function update() {

	if (cursors.left.isDown) {
        //player.sprite.x -= 4;
		map.tiles.
    }
    else if (cursors.right.isDown) {
        player.sprite.x += 4;
    }

    if (cursors.up.isDown) {
        player.sprite.y -= 4;
    }
    else if (cursors.down.isDown) {
        player.sprite.y += 4;
    }
}

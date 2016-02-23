var GAME_SIZE = 2;
var TILE_SIZE = 16;
var ROTATIONS = ["left", "right", "up", "down"];
var player, boogey;

var game = new Phaser.Game(GAME_SIZE*16*16, GAME_SIZE*16*16, Phaser.AUTO, 'content', {
  preload: preload,
  create: create,
  update: update,
  render: render
});

function Sprite(name, url, x, y) {
	this.move = function(direction) {
		if((this.moveTime + this.moveThreshold) < game.time.now) {
			if(ROTATIONS[this.rotation] != direction) {
				var direction_int = ROTATIONS.indexOf(direction);
				this.rotation = direction_int >= 0 ? direction_int : this.rotation;
				this.moveTime = game.time.now;
			}
			else {
				var x_par = 0;
				var y_par = 0;
				if(direction == "left") {
					x_par = -1;
				} else if (direction == "right") {
					x_par = 1;
				} else if (direction == "up") {
					y_par = -1;
				} else if (direction == "down") {
					y_par = 1;
				} else {
					return;
				}
				if(!(tiles[this.y + y_par][this.x + x_par].collideable)){
					this.x += x_par;
					this.y += y_par;
					this.moveTime = game.time.now;
				}
				else {
					//COLLIDE
				}
			}
			this.updateLocation();
		}
	}
	this.updateLocation = function() {
		this.sprite.x = this.getX(); // ADD LERP
		this.sprite.y = this.getY(); // ADD LERP
		//console.log(this.sprite.scale.x);
		this.sprite.scale.x = Math.abs(this.sprite.scale.x) - (this.rotation % 2) * 2 * Math.abs(this.sprite.scale.x);
	}
	this.getX = function() {
		return this.x * GAME_SIZE * TILE_SIZE + TILE_SIZE/2;
	}
	this.getY = function() {
		return this.y * GAME_SIZE * TILE_SIZE + TILE_SIZE/2;
	}

	this.name = name;
	this.url = url;
	this.x = x;
	this.y = y;
	this.sprite = game.add.sprite(this.getX(), this.getY(), this.name);
	this.sprite.width = TILE_SIZE * GAME_SIZE;
	this.sprite.height = TILE_SIZE * GAME_SIZE;
	this.sprite.anchor.setTo(0.5, 0.5);
	this.moveTime = 0;
	this.moveThreshold = 250;
	this.rotation = 0;

}

function Tile(val, x, y, height, width, collideable) {
  this.url = tileset[val].url;
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.collideable = tileset[val].collideable;
  var sprite = game.add.sprite(x, y, tileset[val].name);
  sprite.width = GAME_SIZE * TILE_SIZE;
  sprite.height = GAME_SIZE * TILE_SIZE;
}

/*
	0: Floor
	1: Wall
	2: Aisle
	3: Office
	4: Register
	5: Produce
	6: Meat
	7: Freezers
	8: UI Background
	9: Stealth Bar (8)
*/
var level = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 7, 0, 0, 6, 6, 6, 6, 6, 6, 6, 0, 0, 5, 5, 1],
	[1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1],
	[1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 1],
	[1, 7, 0, 7, 0, 2, 0, 2, 0, 2, 5, 0, 5, 0, 5, 1],
	[1, 7, 0, 7, 0, 2, 0, 2, 0, 2, 5, 0, 0, 0, 5, 1],
	[1, 7, 0, 7, 0, 2, 0, 2, 0, 2, 5, 0, 0, 0, 5, 1],
	[1, 7, 0, 7, 0, 2, 0, 2, 0, 2, 5, 0, 5, 0, 5, 1],
	[1, 7, 0, 7, 0, 2, 0, 2, 0, 2, 5, 0, 5, 0, 5, 1],
	[1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1],
	[1, 3, 3, 3, 0, 0, 4, 0, 4, 0, 4, 0, 0, 6, 6, 1],
	[1, 3, 3, 3, 0, 0, 4, 0, 4, 0, 4, 0, 6, 0, 0, 1],
	[1, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
	[8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 8, 8]
]

var tileset = [
	{
		name: "floor",
		url: "./assets/floor.png",
		collideable: false
	},
	{
		name: "wall",
		url: "./assets/wall.png",
		collideable: true
	},
	{
		name: "aisle",
		url: "./assets/aisle.png",
		collideable: true
	},
	{
		name: "office",
		url: "./assets/office.png",
		collideable: true
	},
	{
		name: "register",
		url: "./assets/register.png",
		collideable: true
	},
	{
		name: "produce",
		url: "./assets/produce.png",
		collideable: true
	},
	{
		name: "meat",
		url: "./assets/meat.png",
		collideable: true
	},
	{
		name: "freezer",
		url: "./assets/freezer.png",
		collideable: true
	},
	{
		name: "ui_bg",
		url: "./assets/ui-bg.png",
		collideable: true
	},
	{
		name: "stealth_bar",
		url: "./assets/stealth-bar.png",
		collideable: true
	}
];

var tiles = []

function preload() {
	for (i in tileset) {
		game.load.image(tileset[i].name, tileset[i].url);
	}
	game.load.image(tileset[i].name, tileset[i].url);
	game.load.spritesheet("player", "./assets/player.png", 32, 48);
	game.load.spritesheet("boogey", "./assets/boogey.png", 32, 32);
}

function create() {
	cursors = game.input.keyboard.createCursorKeys();
	var x, y;
	y = 0;
	for(i in level) {
		x = 0;
		var temp = [];
		for (j in level[i]) {
			temp.push(new Tile(level[i][j], x, y));
			x += GAME_SIZE * TILE_SIZE;
		}
		tiles.push(temp);
		y += GAME_SIZE * TILE_SIZE;
	}

	player = new Sprite("player", "./assets/player.png", 2, 2);
	boogey = new Sprite("boogey", "./assets/boogey.png", 11, 6);
	//console.log(player.sprite.height);
}

function update() {

	if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
		player.move("up");
	}
	else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
		player.move("left");
	}
	else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
		player.move("down");
	}
	else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
		player.move("right");
	}


	// Add Boogey Movement
}

function render() {

}

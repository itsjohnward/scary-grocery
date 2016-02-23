var GAME_SIZE = 2;
var TILE_SIZE = 16;

var game = new Phaser.Game(GAME_SIZE*16*16, GAME_SIZE*16*16, Phaser.AUTO, 'content', {
  preload: preload,
  create: create,
  update: update,
  render: render
});

var player = {
	name: "player",
	url: "./assets/player.png",
	moveTime: 0,
	moveThreshold: 250,
	x: 2,
	y: 2,
	moveLeft: function() {
		console.log("x: " + this.x + " / y: " + this.y);
		if(!(tiles[this.y][this.x-1].collideable)){
			console.log("moveLeft");
			if((this.moveTime + this.moveThreshold) < game.time.now) {
				this.x--;
				this.moveTime = game.time.now;
				console.log("x: " + this.x + " / y: " + this.y);
			}
			else {
				console.log("move: " + this.moveTime+this.moveThreshold + " / game: " + game.time.now);
			}
		}
		else {
			console.log("can't moveLeft");
			console.log(tiles[this.y][this.x-1]);
			// Sound Effect
		}
		this.updateLocation();
	},
	moveRight: function() {
		console.log("x: " + this.x + " / y: " + this.y);
		if(!(tiles[this.y][this.x+1].collideable)){
			console.log("moveRight");
			if((this.moveTime + this.moveThreshold) < game.time.now) {
				this.x++;
				this.moveTime = game.time.now;
				console.log("x: " + this.x + " / y: " + this.y);
			}
			else {
				console.log("move: " + this.moveTime+this.moveThreshold + " / game: " + game.time.now);
			}
		}
		else {
			console.log("can't moveRight");
			console.log(tiles[this.y][this.x+1]);
			// Sound Effect
		}
		this.updateLocation();
	},
	moveUp: function() {
		console.log("x: " + this.x + " / y: " + this.y);
		if(!(tiles[this.y-1][this.x].collideable)){
			console.log("moveUp");
			if((this.moveTime + this.moveThreshold) < game.time.now) {
				this.y--;
				this.moveTime = game.time.now;
				console.log("x: " + this.x + " / y: " + this.y);
			}
			else {
				console.log("move: " + this.moveTime+this.moveThreshold + " / game: " + game.time.now);
			}
		}
		else {
			console.log("can't moveUp");
			console.log(tiles[this.y-1][this.x]);
			// Sound Effect
		}
		this.updateLocation();
	},
	moveDown: function() {
		console.log("x: " + this.x + " / y: " + this.y);
		if(!(tiles[this.y+1][this.x].collideable)){
			console.log("moveDown");
			if((this.moveTime + this.moveThreshold) < game.time.now) {
				this.y++;
				this.moveTime = game.time.now;
				console.log("x: " + this.x + " / y: " + this.y);
			}
			else {
				console.log("move: " + this.moveTime+this.moveThreshold + " / game: " + game.time.now);
			}
		}
		else {
			console.log("can't moveDown");
			console.log(tiles[this.y+1][this.x]);
			// Sound Effect
		}
		this.updateLocation();
	},
	updateLocation: function() {
		this.sprite.x = this.getX();
		this.sprite.y = this.getY();
	},
	getX: function() {
		return this.x * GAME_SIZE * TILE_SIZE;
	},
	getY: function() {
		return this.y * GAME_SIZE * TILE_SIZE;
	}
};
var boogey = {
	name: "boogey",
	url: "./assets/boogey.png",
	moveTime: 0,
	moveThreshold: 250,
	x: 11,
	y: 6,
	moveLeft: function() {

	},
	moveRight: function() {

	},
	moveUp: function() {

	},
	moveDown: function() {

	}
};

var buttonTime = 0;

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
	game.load.spritesheet(player.name, player.url, 32, 48);
	game.load.spritesheet(boogey.name, boogey.url, 32, 32);
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


	/*

		v UPDATE LOCATION PARAMETERS
			Since x and y were added to player object

	*/

	player.sprite = game.add.sprite(player.getX(), player.getY(), player.name);
	console.log(player.sprite.width);
	player.sprite.width = TILE_SIZE * GAME_SIZE;
	player.sprite.height = TILE_SIZE * GAME_SIZE;
	console.log(player.sprite.height);
	boogey.sprite = game.add.sprite(tiles[11][6].x, tiles[11][6].y, boogey.name);
	boogey.sprite.width = TILE_SIZE * GAME_SIZE;
	boogey.sprite.height = TILE_SIZE * GAME_SIZE;
}

function update() {

	if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
		player.moveUp();
	}
	else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
		player.moveLeft();
	}
	else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
		player.moveDown();
	}
	else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
		player.moveRight();
	}


	// Add Boogey Movement
}

function render() {

}

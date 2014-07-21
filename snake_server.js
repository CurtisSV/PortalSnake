function Snake(x,y,dir){
	this.dir = dir; // this is a string direction. 
	this.tail = [ [0,1], [0,0]]; // starts at 00.
}

Snake.prototype.turn = function(dir){
	var that = this;
	//alert("dir " + dir + "this.dir" + that.dir);


	if(dir == "east" || dir == "west"){ // wants to go left/right 
		if(that.dir == "north" || that.dir == "south"){ //snakes going up/down
			that.dir = dir; 
			//alert("turn " + dir); 
		}
	}
	if(dir == "north" || dir == "south"){ // wants to go up/down
		if(that.dir == "east" || that.dir == "west"){ //snakes going left/right
			that.dir = dir; 
			//alert("turn " + dir);
		}
	}
}

Snake.prototype.update = function(){
	var head = this.tail[0];
	var dir = dirToCoords(this.dir);
	var newHead = [ head[0] + dir[0], head[1] + dir[1] ];
	if(contains(this.tail, newHead)) { return true; } // GAME OVER!
	if(this.game.outOfBounds(newHead)){ return true; } // game over!

	var powerUp = this.game.powerUp;
	if( newHead[0] == powerUp[0] && newHead[1] == powerUp[1] ){
		this.tail.unshift(newHead);
		this.tail.unshift(this.game.generateRandomCoord())
		this.game.powerUp = this.game.generateRandomCoord();
		// don't remove the tail.
	}
	else{ //move the snake forward by adding one head, and removing one from tail
		this.tail.unshift(newHead);
		this.tail.pop();
	}
	return false;

}
function contains(metaArray, array){
	bool = false
	_.each(metaArray, function(curArray){
		if( curArray[0] == array[0] && curArray[1] == array[1] ){
			bool = true;
	}
	});
	return bool;
}

Game.prototype.outOfBounds = function(coord) {
	if(coord[0] >= 20 || coord[0] < 0){
		return true
	}
	if(coord[1] >= 20 || coord[1] < 0){
		return true
	}
}


function dirToCoords(dir){
	if(dir == "west"){
		return [0,-1];
	}
	if(dir == "east"){
		return [0,1]
	}
	if(dir == "south"){
		return [1, 0];
	}
	if(dir == "north"){
		return [-1, 0]
	}
}

function Game(){
	this.bindKeyHandlers();
	this.snake = new Snake(0,0,"east");
	this.snake.game = this;
	this.grid = generateEmptyGrid();
	this.powerUp = this.generateRandomCoord();
}

function generateEmptyGrid(){
	var grid = []; // array of rows. 
	for(var r = 0; r< 20; r++){
		grid[r] = []; // new row
		for(var c = 0; c< 20; c++){
			grid[r][c] = ".";
		}
	}
	console.log("generateEmptyGrid asdfasdfasdf");
	return grid;
}

Game.prototype.generateRandomCoord = function(){
	var x = Math.floor(this.grid.length * Math.random() );
	var y = Math.floor(this.grid.length * Math.random() );
	return [x,y];
}

Game.prototype.step = function(){
	game_over = this.snake.update();
	if(game_over){ console.log("game over")};
}

Game.prototype.bindKeyHandlers = function () {
	    var that = this;

	    var directions = {
	      "w": "north",
	      "a":  "west" ,
	      "d":  "east",
	      "s": "south"
	    }

	    _.each(directions, function (v, k) {
	      key(k, function () { that.snake.turn(v); });
	    });
	  };

Game.prototype.render = function(){
	//return this.grid.join();
	var renderGrid = ["asdfasdf"];
	for(var r = 0; r< this.grid.length ; r++){
		renderGrid[r] = [];
		for(var c=0; c< this.grid.length; c++){
			contains(this.snake.tail, [r,c]) ? renderGrid[r][c] = "s" : renderGrid[r][c] = "."
		}
	}
	console.log(renderGrid);
	return renderGrid.split().join();
}



function myAlert(){
	alert("myalert!");
}
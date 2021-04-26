let context;
let boardSize = 17;
const empty = 0;
const point5 = 1;
const pacman = 2;
const point15 = 3;
const point25 = 4;
const wall = 5;
const bonus = 6;
const monster1 = 10;
const monster2 = 11;
const monster3 = 12;
const monster4 = 13; // strongest monster!

let monsters_num;
let monster_pos = [{},{},{},{}];
let before_monster = [];

let pacman_pos = {};
let pac_color;
let pac_side = 1; // default = right side

let bonus_pos = {};
let before_bonus = empty;
let board;
let score = 0;
let lives = 5;
let start_time;
let time_elapsed;
let totalTime;
let first_start = true;
let interval;
let interval_monsters;
let interval_bonus;
let canvas;
let lblLives;
let lblScore;
let keyBoard={right: 39,down: 40,left: 37, up: 38};
let KeyBoardValues = {left: 'ArrowLeft', up: 'ArrowUp', right: 'ArrowRight', down: 'ArrowDown'};

let level;
let game_audio = new Audio('./audio/intro.mp3');
let death_audio = new Audio('./audio/Death.mp3');
let win_audio = new Audio('./audio/complete.mp3');

$(document).ready(function() {
	canvas = document.getElementById('canvas');
	lblLives = document.getElementById('lblLives');
	lblScore = document.getElementById('lblScore');
	context = canvas.getContext("2d");
	setKeys();
	// Start();
});

function Start() {
	totalTime = document.getElementById('timeChosen').value;
	game_audio.loop = true;
	score = 0;
	lives = 5;

	board = [];
	monsters_num = document.getElementById('monstersAmountChosen').value;
	pac_color = "yellow";
	let walls = ["23", "24", "25", "28", "29","35", "41", "42", "43", "49", "410",
		"411", "62", "65", "66", "67", "610", "72", "77", "710", "82", "85",
		"87", "810", "92",  "95", "910", "102", "105", "106", "107","1010", "121",
		"122", "123", "129", "1210", "1211", "135","143","144", "145", "148", "149"];
	let food_remain = document.getElementById("ballsAmountChosen").value;
	let food5_remain = 0.6 * food_remain;
	let food15_remain = 0.3 * food_remain;
	let food25_remain = 0.1 * food_remain;
	start_time = new Date();
	for (let i = 0; i < boardSize; i++) {
		board[i] = [];
		for (let j = 0; j < boardSize-4; j++) {

			if (walls.includes(i + "" + j) || (i === 0) || (j === 0) || (i === boardSize-1) || (j === boardSize-5))
				board[i][j] = wall;
			else
				board[i][j] = empty;
		}
	}

	PlacePoints(point5, food5_remain);
	PlacePoints(point15, food15_remain);
	PlacePoints(point25, food25_remain);
	PlacePacman();
	PlaceMonsters();
	PlaceBonus();

	keysDown = {};
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);
	addEventListener("keyup", function (e) {
		keysDown[e.keyCode] = false;
	}, false);

	interval = setInterval(function(){UpdatePosition(); }, 100);

	// speed of monsters changes according to level
	level = $("input[type='radio'][name='level']:checked").val(); // get chosen level (from radio button)
	let timeout;
	if (level === 'hard')
		timeout = 300;
	else // easy
		timeout = 900;
	interval_monsters = setInterval(MoveMonster, timeout);
	interval_bonus = setInterval(MoveBonus, timeout);
	game_audio.play();

}

function PlacePacman(){
	let pos = GetRandomPosition();
	pacman_pos.i = pos[0];
	pacman_pos.j = pos[1];
	board[pos[0]][pos[1]] = pacman;
}


function PlaceMonsters() {
	let corners = [[1,1], [boardSize-2,1], [1,boardSize-6], [boardSize-2,boardSize-6]];
	for (let i = 0; i < monsters_num; i++) {
		let x = corners[i][0];
		let y = corners[i][1];
		before_monster[i] = board[x][y];
		board[x][y] = i + 10; // monsters are 10,11,12,13
		monster_pos[i].i = x;
		monster_pos[i].j = y;
	}

}

function PlaceBonus() {
	board[8][6] = bonus; // bonus starts in middle of board
	bonus_pos.i = 8;
	bonus_pos.j = 6;
}

function ClearMonsters() {
	for (let i = 0; i < monsters_num; i++) {
		board[monster_pos[i].i][monster_pos[i].j] = empty;
	}
}

function PlacePoints(point_type, amount) {
	while (amount > 0){
		let pos = GetRandomPosition();
		board[pos[0]][pos[1]] = point_type;
		amount--;
	}
}

function GetRandomPosition() {
	let size = board.length;
	let x = Math.floor(Math.random() * size);
	let y = Math.floor(Math.random() * size);
	while (board[x][y] !== empty) {
		x = Math.floor(Math.random() * size);
		y = Math.floor(Math.random() * size);

	}
	return [x, y];
}

/**
 * @return {number}
 */
function GetKeyPressed() {
	if (keysDown[keyBoard.right]) {
		return 1;
	}
	if (keysDown[keyBoard.down]) {
		return 2;
	}
	if (keysDown[keyBoard.left]) {
		return 3;
	}
	if (keysDown[keyBoard.up]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblLives.value = lives;
	DrawTime();
	let wall_img = new Image();
	wall_img.src = "images/wall2.jpg";
	let cookie_img = new Image();
	cookie_img.src = "images/cookie.gif";

	for (let i = 0; i < boardSize; i++) {
		for (let j = 0; j < boardSize-4; j++) {
			let center = {};
			center.x = i * 40 + 25;
			center.y = j * 40 + 25;
			if (board[i][j] === pacman) {
				DrawPacman(center.x, center.y, pac_side);

			} else if (board[i][j] === point5) {
				DrawPoint(center.x, center.y, 5, document.getElementById("colorPick5").value)

			} else if (board[i][j] === point15) {
				DrawPoint(center.x, center.y, 7, document.getElementById("colorPick15").value)

			} else if (board[i][j] === point25) {
				DrawPoint(center.x, center.y, 9, document.getElementById("colorPick25").value)

			} else if (board[i][j] === wall) {
				// context.fillStyle = "beige";
				// context.fillRect(center.x - 20, center.y - 20, 40, 40);
				context.drawImage(wall_img,center.x - 20, center.y - 20, 40, 40);
			}
			else if (board[i][j] === bonus){
				context.drawImage(cookie_img, center.x-20, center.y-20, 40, 40);
			}
			// monsters
			else if (board[i][j] === monster1){
				DrawMonster(context, 18, "red", center.x, center.y);
			}
			else if (board[i][j] === monster2){
				DrawMonster(context, 18, "orange", center.x, center.y);
			}
			else if (board[i][j] === monster3){
				DrawMonster(context, 18, "green", center.x, center.y);
			}
			else if (board[i][j] === monster4){
				DrawMonster(context, 22, "black", center.x, center.y, "red");
			}
		}
	}

}

function DrawPacman(x, y, side) {
	context.beginPath();
	context.arc(x,y , 18, (0.2 + 0.5 * (side - 1)) * Math.PI, (1.8 + 0.5 * (side - 1)) * Math.PI);
	context.lineTo(x, y);
	context.fillStyle = pac_color;
	context.fill();
	context.beginPath();

}


function DrawPoint(x, y, radius, color) {
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI); // circle
	context.fillStyle = color;
	context.fill();
}


function DrawMonster(ctx, radius, color, x, y, eyecolor="white") {
	/***
	 * code taken from http://www.java2s.com/example/javascript-book/pacman-and-ghost.html
	 *
	 */
	let feet =  4;
	let head_radius = radius * 0.8;
	let foot_radius = head_radius / feet;
	ctx.save();
	ctx.strokeStyle = color.stroke || "white";
	ctx.fillStyle = color;
	ctx.lineWidth = color.lineWidth || radius * 0.05;
	ctx.beginPath();
	for (let foot = 0; foot < feet; foot++) {
		ctx.arc(
			(2 * foot_radius * (feet - foot)) - head_radius - foot_radius + x,
			radius - foot_radius + y,
			foot_radius, 0, Math.PI
		);
	}

	ctx.lineTo(x-head_radius, y+radius - foot_radius);
	ctx.arc(x, y+head_radius - radius, head_radius, Math.PI, 2 * Math.PI);

	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	//eyes
	ctx.fillStyle = eyecolor;
	ctx.beginPath();
	ctx.arc(x-head_radius / 2.5, y-head_radius / 2, head_radius / 3, 0, 2 * Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(x+head_radius / 3.5, y-head_radius / 2, head_radius / 3, 0, 2 * Math.PI);
	ctx.fill();

	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.arc(x-head_radius / 2, y-head_radius / 2.2, head_radius / 8, 0, 2 * Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(x+head_radius / 4, y-head_radius / 2.2, head_radius / 8, 0, 2 * Math.PI);
	ctx.fill();

	ctx.restore();
}

function DrawTime() {
	lblTime.value = time_elapsed;
}

function UpdatePosition() {
	board[pacman_pos.i][pacman_pos.j] = empty;
	let currentTime = new Date();
	time_elapsed = Math.round(totalTime-(currentTime - start_time)/ 1000);
	if (time_elapsed <= 0)
	{
		StopGame();
		death_audio.play();
		window.alert("Times up Loser!")
	}
	let x = GetKeyPressed();
	if (x !== undefined)
		pac_side = x;
	if (x === 1) // right
	{
		if (board[pacman_pos.i + 1][pacman_pos.j] !== wall) {
			pacman_pos.i++;
		}
	}

	if (x === 2) // down
	{
		if (board[pacman_pos.i][pacman_pos.j + 1] !== wall) {
			pacman_pos.j++;
		}
	}
	if (x === 3) // left
	{
		if (board[pacman_pos.i - 1][pacman_pos.j] !== wall) {
			pacman_pos.i--;
		}
	}
	if (x === 4) // up
	{
		if (board[pacman_pos.i][pacman_pos.j - 1] !== wall) {
			pacman_pos.j--;
		}
	}

	CheckIfHit();

	let spot = board[pacman_pos.i][pacman_pos.j];
	if (spot === point5) {
		score += 5;
	} else if (spot === point15) {
		score += 15;
	} else if (spot === point25) {
		score += 25;
	} else if (spot === bonus) {
		score += 50;
		window.clearInterval(interval_bonus);
	}

	board[pacman_pos.i][pacman_pos.j] = pacman;
	if (!first_start && !board.find(PointsLeft)) { // if there are no more points on board - player wins!
		StopGame();
		win_audio.play().then(r => window.alert("Game completed"));

	}
	if (x !== undefined || first_start) {
		Draw();
		first_start = false;
	}

}

function CheckIfHit() {
	let monster_hit = HitMonster();
	if (monster_hit >= 0){
		if (monster_hit === 3) // strong monster was hit
			score -= 20;
		else
			score -= 10;
		lives --;
		if (lives === 0 ){
			StopGame();
			death_audio.play();
			window.alert("No lives left Loser!");
		}
		else {
			ClearMonsters();
			PlaceMonsters();
			PlacePacman();
		}
	}
}

function StopGame() {
	window.clearInterval(interval);
	window.clearInterval(interval_monsters);
	window.clearInterval(interval_bonus);
	// lblScore.value = 0;
	// lblLives.value = lives;
	game_audio.pause();
	game_audio.currentTime = 0;

}


/**
 * @return {boolean}
 * returns true if there are still points on the board or in before_monster (meaning monster is currently "covering" a point, meaning pacman hasn't finished yet
 */

function PointsLeft(lst) {
	return lst.includes(point5) || lst.includes(point15) || lst.includes(point25) || before_monster.includes(point5) || before_monster.includes(point15) || before_monster.includes(point25);

}

/**
 * @return {number} which monster was hit, if no monsters were hit returns -1
 */
function HitMonster(){
	for (let i = 0; i < monsters_num; i++) {
		if ((pacman_pos.i === monster_pos[i].i && pacman_pos.j === monster_pos[i].j) || (pacman_pos.i === before_monster[i].i || pacman_pos.j === before_monster[i].j))
			return i;
	}
	return -1;
}


function GetPossibleNeighbors(i, j){
	// possible neighbor is anything but wall or other monster (monsters are 10,11,12,13) or bonus
	let neighbors = [];
	// if (board[i+1][j] !== wall && board[i+1][j] < 10 && board[i+1][j] !== bonus)
	// 	neighbors.push([i+1, j]);
	//
	// if (board[i-1][j] !== wall && board[i-1][j] < 10 && board[i-1][j] !== bonus)
	// 	neighbors.push([i-1 , j]);
	//
	// if (board[i][j+ 1] !== wall && board[i][j+1] < 10 && board[i][j+1] !== bonus)
	// 	neighbors.push([i , j+1]);
	//
	// if (board[i][j-1] !== wall&& board[i][j-1] < 10 && board[i][j-1] !== bonus)
	// 	neighbors.push([i, j-1]);
	if (board[i+1][j] < 5)
		neighbors.push([i+1, j]);

	if (board[i-1][j] < 5)
		neighbors.push([i-1 , j]);

	if (board[i][j+ 1] < 5)
		neighbors.push([i , j+1]);

	if (board[i][j-1] < 5)
		neighbors.push([i, j-1]);

	return neighbors;
}


function MonsterSmartMove(m_pos){

	let neighbors = GetPossibleNeighbors(m_pos.i, m_pos.j);
	let min = 1000;
	let res;
	for (let i = 0; i < neighbors.length ; i++) {
		let x = neighbors[i][0];
		let y = neighbors[i][1];
		let distance = Math.abs(x-pacman_pos.i) + Math.abs(y-pacman_pos.j);
		if (distance < min)
		{
			min = distance;
			res = neighbors[i]
		}
	}
	m_pos.i = res[0];
	m_pos.j = res[1];

}

function MoveMonster(){
	for (let i = 0; i < monsters_num; i++) {
		board[monster_pos[i].i][monster_pos[i].j] = before_monster[i]; // put back what was in spot before monster (e.g point)
		MonsterSmartMove(monster_pos[i]);
		before_monster[i] = board[monster_pos[i].i][monster_pos[i].j]; // update before_monster to next spot monster will go
		if (before_monster[i] === pacman) {
			before_monster[i] = empty;
			CheckIfHit();
		}
		board[monster_pos[i].i][monster_pos[i].j] = i + 10; // i+10 is monster
	}
	Draw();
}

function MoveBonus(){
	board[bonus_pos.i][bonus_pos.j] = before_bonus;
	let neighbors = GetPossibleNeighbors(bonus_pos.i, bonus_pos.j);
	let rand = Math.floor(Math.random()*neighbors.length);
	bonus_pos.i = neighbors[rand][0];
	bonus_pos.j = neighbors[rand][1];
	before_bonus = board[bonus_pos.i][bonus_pos.j];
	if (bonus_pos.i === pacman_pos.i && bonus_pos.j === pacman_pos.j){ // if bonus goes to pacman - it is pacman's lucky day!
		score += 50;
		window.clearInterval(interval_bonus);
	}
	else
		board[bonus_pos.i][bonus_pos.j] = bonus;

	Draw();

}


function setKeys() {
    document.getElementById("keyleft").addEventListener('keydown', function (event) {
        keyBoard.left = event.which;
        this.value = event.key;
        KeyBoardValues.left = event.key;
    });

    document.getElementById("keyright").addEventListener('keydown', function (event) {
        keyBoard.rigth = event.which;
        this.value = event.key;
        KeyBoardValues.right = event.key;

    });

    document.getElementById("keydown").addEventListener('keydown', function (event) {
        keyBoard.down = event.which;
        this.value = event.key;
        KeyBoardValues.down = event.key;

    });

    document.getElementById("keyup").addEventListener('keydown', function (event) {
        keyBoard.up = event.which;
        this.value = event.key;
        KeyBoardValues.up = event.key;

    });
}

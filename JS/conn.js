//@ts-check

/*Function to create 2d array, JS doesn't do any favors*/
function gridCreator(){
	let arr = new Array(6);
	//fill each array index with an array
	for(let i = 0; i < arr.length; i++){
		arr[i] = new Array(7) 
	}
	
	//Fill all arrays with 0 
	for(let i = 0; i < 6; i++){
		for(let j = 0; j < 7; j++){
			arr[i][j] = 0;
		}
	}
	return arr;
}

/*Utility function to print the array (debugging) */
function arrayPrinter2d(arr){
	for(let i = 0; i < arr.length; i++){
		console.log(arr[i]);
	}
}

/*Object Game: brings all other three objects together, runs basic operations*/

function Game(){
	this.alternate = true;  
	this.board 	   = new Board();
	this.sidebar   = new Sidebar();
	this.time      = new Timer();
	this.count     = 0; 		//count all moves(so it not exceed 42 moves)

	this.fill = function(num){
		if(this.board.validBlock(num)){
			let i = this.board.fillBlock(num);    //fill and return row of fill

			if(this.board.verifyWin(i, num)){
				this.reset(true);
				this.time.resetTime();
			}else{
				this.board.changeColor();
				this.changeTextColor();
				this.count++;
			} 
		}else{
			window.prompt('This is not a valid move, try again');
		}

		//Check if a tie has occured
		if(this.count === 42){
			window.prompt('It\'s a draw');
			this.board.cleanBoard();
		} 
		
	};
	/*Alternate text color to i
	 *indicate player's turn
	 */
	this.changeTextColor = function(){
		this.sidebar.changeTextColor(this.alternate);
		this.alternate = !this.alternate;
	};
	/*If someone won, score update occurs
	 *If someone pressed reset, no score update
	 */
	this.reset = function(win){
		if(win) this.updateScore();
		this.board.cleanBoard();
		this.changeTextColor(); 
		this.board.changeColor(); //other player starts new game  
		this.count = 0;
	}
	this.updateScore = function(){
		if(this.board.getCurrentColor() === 1) this.sidebar.redWin();
		else							 	 this.sidebar.blueWin();
		
	}
	this.decreaseTime = function(){
		this.time.decrementTime();
		document.getElementById('time').textContent = (this.time.getTime()) + '';
		if(this.time.getTime() == 0){
			this.time.resetTime();
			this.board.changeColor();
			this.changeTextColor();

		} 
	}
}

/*Implement main board*/
function Board(){
	this.grid = gridCreator();    //2D Arrays
	this.red  = '#b83d3d';
	this.blue = '#5275cc';
	this.gray = '#333333';
	this.currentColor = 1;        //starter color: 1 ==red, 2 == blue

	this.getCurrentColor = function(){
		return this.currentColor;
	}
	/* Checks if there is space in the 
	 * top of the matrix
	 */
	this.validBlock = function(num){
		if(this.grid[0][num] === 0) return true;
		else false;
	}
	this.verifyWin = function(i, j) { 
		if(this.verticalVerify(j))     return true; 
		if(this.horizontalVerfy(i))    return true; 
		if(this.diagonalVerify1(i, j)) return true; 
		if(this.diagonalVerify2(i, j)) return true;
		return false;
		
	};
	this.cleanBoard = function() {
		for(let i = 0; i < this.grid.length; i++){
			for(let j = 0; j < this.grid[0].length; j++){
				this.grid[i][j] = 0;
				let block = document.getElementById( i + '' + j);
				block.style.backgroundColor = this.gray;
			}
		}
	};
	this.fillBlock = function (num) {
		let i = 0;
		while(i < 5 && this.grid[i+1][num] === 0){  //find uppermost row that is empty in column num
			i++;
		}
		this.grid[i][num] = this.currentColor; 		//fill grid spot
		this.fill(i, num); 							//fill the actual square in CSS color
		return i; 									//reutrns the row number
	};

	/* Targets and fills the actual block*/
	this.fill = function(i, j){ 
		let block = document.getElementById( i + '' + j); //craete string and query for element
		if(this.currentColor === 1) block.style.backgroundColor = this.red;
		else 						block.style.backgroundColor = this.blue;	
	};
	/* Change current color*/
	this.changeColor = function() {
		if(this.currentColor === 1) this.currentColor = 2; //if red, change to blue
		else this.currentColor = 1;						   //if blue, change to red
	};

	/* Functions to verify if someone has won the game*/
	this.verticalVerify = function(j){
		let vertCount = 0;
		for(let n = 0; n < 6; n++){
			if(this.grid[n][j] === this.currentColor){
				vertCount++;
				if(vertCount === 4){
					window.prompt('vertical Win');
					return true;
				}
			}else vertCount = 0;
		}
		return false;

	};
	this.horizontalVerfy = function(i){
		let horCount = 0;
		for(let n = 0; n < 7; n++){
			if(this.grid[i][n] === this.currentColor){
				horCount++;
				if(horCount === 4){
					window.prompt('horizontal Win 1'); 
					return true;
				} 
			}else horCount = 0;
		}
		return false;
	};
	/* diagonal in this direction -> \  */
	this.diagonalVerify1 = function(i, j){
		let diagCount = 1;
		let i2 = i;
		let j2 = j;
		for(let n = 0; n < 6; n++){
			i++;
			j++;
			if(i < 6 && j < 7 && this.grid[i][j] === this.currentColor){
				diagCount++;
			}else break;
		}
		for(let n = 0; n < 6; n++){
			i2--;
			j2--;
			if(i2 > -1 && j2 > -1 && this.grid[i2][j2] === this.currentColor){
				diagCount++;
			}else break;
		}

		if(diagCount === 4){
			window.prompt('diagonal win 1');
			return true;
		}
		return false;
	};
	/*diagonal in that direction -> /   */
	this.diagonalVerify2 = function(i, j){
		let diagCount = 1;
		let i2 = i;
		let j2 = j;
		for(let n = 0; n < 6; n++){
			i--;
			j++;
			if(i > -1 && j < 7 && this.grid[i][j] === this.currentColor){
				diagCount++;
			}else break;
		}
		for(let n = 0; n < 6; n++){
			i2++;
			j2--;
			if(i2 < 6 && j2 > -1 && this.grid[i2][j2] === this.currentColor){
				diagCount++;
			}else break;
		}

		if(diagCount === 4){
			window.prompt('diagonal win 2');
			return true;
		}
		return false;
	};
};
	

/*Implement the sidebar object*/
function Sidebar(){
	this.redScore  = 0;
	this.blueScore = 0;
	
	this.redWin = function(){
		this.redScore++;
		let score = document.getElementById('red-win');
		score.textContent = this.redScore + '';
	}
	this.blueWin = function(){
		this.blueScore++;
		let score = document.getElementById('blue-win');
		score.textContent = this.blueScore + '';
	}
	this.changeTextColor = function(alternate){
		let topText = document.querySelectorAll('span');
		for(let i = 0; i < topText.length; i++){
			if(alternate){
				topText[i].style.color = '#5275cc';
				topText[i].textContent = 'Blue\'s';
			} 
			else {
				topText[i].style.color = '#b83d3d';
				topText[i].textContent = 'Red\'s';
			}			   		
		}

	}
}

/*Implement the timer object*/
function Timer(){
	this.time = 20;
	this.getTime = function(){
		return this.time;
	}
	this.decrementTime = function(){
		this.time--;
	}
	this.resetTime = function(){
		this.time = 21;
	}
}


/* * * * * * * * *
 * Game functionality starts here:
 * We create a game object that manages all 
 * the game events. When a player clicks on 
 * one of the columns, the listeners activate 
 * the Game method Fill(col). Game also manages
 * the time object and the side bar to keep record
 * of the game score, reset options and music 
 * option
 * * * * * * * * */

let game  = new Game();  //game object

/*Button Listener Events*/
const button0 = document.getElementById('choose0');
const button1 = document.getElementById('choose1');
const button2 = document.getElementById('choose2');
const button3 = document.getElementById('choose3');
const button4 = document.getElementById('choose4');
const button5 = document.getElementById('choose5');
const button6 = document.getElementById('choose6');
const reset   = document.getElementById('reset');


button0.addEventListener('click', function(){
	game.fill(0);
});
button1.addEventListener('click', function(){
	game.fill(1);
});
button2.addEventListener('click', function(){
	game.fill(2);
});
button3.addEventListener('click', function(){
	game.fill(3);
});
button4.addEventListener('click', function(){
	game.fill(4);
});
button5.addEventListener('click', function(){
	game.fill(5);
});
button6.addEventListener('click', function(){
	game.fill(6);
});
reset.addEventListener('click', function(){
	game.reset(false);
});



let countDown = setInterval(function(){
	game.decreaseTime();
}, 1000);




/*
class Shape{
	constructor(id, x, y){
		this.id = id;
		this.x = x;
		this.y = y;
	}
	sayHello(){
		window.prompt('Jesus bro');
	}
}*/

//let square = new Shape(333 , 12, 20);
//square.sayHello();
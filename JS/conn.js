/*Function to create 2d array, JS doesn't do any favors*/
function gridCreator(){
	arr = new Array(6);
	for(let i = 0; i < arr.length; i++){
		arr[i] = new Array(7) 
	}
	
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

/*Implement main board*/
function Board(){
	this.grid = gridCreator();
	this.red  = '#b83d3d';
	this.blue = '#5275cc';
	this.currentColor = 1;        //starter color: 1 ==red, 2 == blue
	this.count = 0; 			  //count all moves(not exceed 42 moves)

	this.verifyWin = function(i, j) { //input is square coordinates of new square
		console.log(arrayPrinter2d(this.grid));
		//console.log(i + '' + j);
		//console.log(this.grid[i][j]);
		//console.log(this.currentColor);
		this.verticalVerify(j);
		this.horizontalVerfy(i);
		this.diagonalVerify1(i, j);
		this.diagonalVerify1(i, j);
		this.diagonalVerify2(i, j);
		
		
	};
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
	this.cleanBoard = function() {
		console.log('to implement');
		
	};
	this.fillBlock = function (num) {
		let i = 0;
		while(i < 5 && this.grid[i+1][num] === 0){
			i++;
		}
		this.grid[i][num] = this.currentColor; 	//fill the arrayy
		this.fill(i, num); 						//fill the actual square in html
		this.changeColor(); 					//change color
		this.count++;
	};

	//targets and fills the actual block
	this.fill = function(i, j){ 
		let block = document.getElementById( i + '' + j); //craete string and look for element
		if(this.currentColor === 1) block.style.backgroundColor = this.red;
		else 						block.style.backgroundColor = this.blue;
		this.verifyWin(i, j);
	};
	//changes the current color
	this.changeColor = function() {
		if(this.currentColor === 1) this.currentColor = 2; //if red, change to blue
		else this.currentColor = 1;						   //if blue, change to red
	};
};
	

/*Implement the sidebar object*/
function Sidebar(){
	this.score = 0;
}

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

/*Implement the timer object*/
function Timer(){
	this.time = 0;
}


let board = new Board(); //board

let square = new Shape(333 , 12, 20);
//square.sayHello();

/*Button Listener Events*/
const button0 = document.getElementById('choose0');
const button1 = document.getElementById('choose1');
const button2 = document.getElementById('choose2');
const button3 = document.getElementById('choose3');
const button4 = document.getElementById('choose4');
const button5 = document.getElementById('choose5');
const button6 = document.getElementById('choose6');


button0.addEventListener('click', function(){
	board.fillBlock(0);
});
button1.addEventListener('click', function(){
	board.fillBlock(1);
});
button2.addEventListener('click', function(){
	board.fillBlock(2);
});
button3.addEventListener('click', function(){
	board.fillBlock(3);
});
button4.addEventListener('click', function(){
	board.fillBlock(4);
});
button5.addEventListener('click', function(){
	board.fillBlock(5);
});
button6.addEventListener('click', function(){
	board.fillBlock(6);
});





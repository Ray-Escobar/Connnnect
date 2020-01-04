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

function arrayPrinter2d(arr){
	for(let i = 0; i < arr.length; i++){
		console.log(arr[i]);
	}
}

const grid = gridCreator();
arrayPrinter2d(grid);


/*Implement main board*/
function Board(grid){
	this.grid = grid;
	this.red  = '#b83d3d';
	this.blue = '#5275cc';
	this.currentColor = true; //if true, red
	this.add = function() {
		console.log('to implement');
		
	};
	this.verifyWin = function() {
		console.log('to implement');
	};
	this.cleanBoard = function() {
		console.log('to implement');
		
	};
	this.fillBlock = function (num) {
		let i = 0;
		while(i < 5 && this.grid[i+1][num] === 0){
			i++;
		}
		this.grid[i][num] = 1;
		let test = document.getElementById( i + '' + num);
		test.style.backgroundColor = '#b83d3d';
	};
	this.changeColor = function() {
		console.log('to implement');
	};
};
	
	


function Person(first, last, age, gender, interests) {
	this.name = {
	  'first': first,
	  'last' : last
	};
	this.age = age;
	this.gender = gender;
	this.interests = interests;
	this.bio = function() {
		var string = this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. ';
		var pronoun;
		if(this.gender === 'male' || this.gender === 'Male' || this.gender === 'm' || this.gender === 'M') {
			pronoun = 'He likes ';
		} else if(this.gender === 'female' || this.gender === 'Female' || this.gender === 'f' || this.gender === 'F') {
			pronoun = 'She likes ';
		} else {
			pronoun = 'They like ';
		}
		string += pronoun;
		// use another conditional to structure the last part of the
		// second sentence depending on number of interests
		if(this.interests.length === 1) {
			string += this.interests[0] + '.';
		} else {
			// if there are more than 2 interests, we loop through them
			for(var i = 0; i < this.interests.length; i++) {
				if(i === this.interests.length - 1) {
					string += 'and ' + this.interests[i] + '.';
				} else {
					string += this.interests[i] + ', ';
				}
			}
		}
		// finally, with the string built, we alert() it
		alert(string);
	};
	this.greeting = function() {
		alert('Hi! I\'m ' + this.name.first + '.');
	};
};


/*Implement the sidebar object*/
function Sidebar(){
	this.score = 0;
}
/*Implement the timer object*/
function Timer(){
	this.time = 0;
}




/*Button Listeners Events*/
const button0 = document.getElementById('choose0');
const button1 = document.getElementById('choose1');
const button2 = document.getElementById('choose2');
const button3 = document.getElementById('choose3');
const button4 = document.getElementById('choose4');
const button5 = document.getElementById('choose5');
const button6 = document.getElementById('choose6');


button0.addEventListener('click', function(){
	fill(0);
})
button1.addEventListener('click', function(){
	fill(1);
})
button2.addEventListener('click', function(){
	fill(2);
})
button3.addEventListener('click', function(){
	fill(3);
})
button4.addEventListener('click', function(){
	fill(4);
})
button5.addEventListener('click', function(){
	fill(5);
})
button6.addEventListener('click', function(){
	fill(6);
})

function fill(num){
	let i = 0;
	while(i < 5 && grid[i+1][num] === 0){
		i++;
	}
	grid[i][num] = 1;
	let test = document.getElementById( i + '' + num);
	test.style.backgroundColor = '#b83d3d';
}




//const test = document.getElementById('5');
//test.style.backgroundColor = 'yellow';



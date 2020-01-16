/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable indent*/
//@ts-check

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





let yourTurn = false;
let startTime = false;
(function setup() {

  //NOTE: this port has to be the same as the one started in server!!!!!!!
  var socket   = new WebSocket("ws://localhost:3000");
    
  /*start counter*/
  let countDown = setInterval(function(){
    if(startTime) game.decreaseTime();
    if(game.getTime() == 0){
      game.resetTime();
      let randCol = Math.floor(Math.random()*7); //randomly assign a unit
      game.fill(randCol);
      sendColumn(randCol);
    }
  }, 1000);

  function sendColumn(col, isWin){
    let outgoingMsg = Messages.O_PICK_A_COLUMN;
    outgoingMsg.data = col;  //column number
    if(isWin) outgoingMsg.win = true;
    socket.send(JSON.stringify(outgoingMsg));
    console.log(JSON.stringify(outgoingMsg));
    
    yourTurn = false;
    document.getElementById('selectors').className = 'Not-your-turn'; //deactivate glow on selectors
    document.getElementById('turn').textContent = 'Waiting for move...';
  }
  /*If player sends reset, other playr notified*/

  socket.onmessage = function(mssg){
    let incomingMsg = JSON.parse(mssg.data);
    if(incomingMsg.type == 'PLAYER-JOINED'){
      if(incomingMsg.data === 1){
        game.board.currentColor = 1; //p1 is red
        yourTurn = true;
      } 
      else{
        game.board.currentColor = 2; //p2 is blue
        document.getElementById('turn').textContent = 'Waiting for move...';
        document.getElementById('selectors').className = 'Not-your-turn';

      }                       
            
    }else if(incomingMsg.type === 'GAME-STARTED'){
      /*change text to tell players it has started*/
      let text = document.querySelector('header p');
      let sp = document.createElement('span');
      text.textContent = 'turn';
      sp.textContent = 'Red\'s ';
      text.prepend(sp);
      startTime = true;

    }else if(incomingMsg.type === 'GAME-RESTART'){
      game.reset();
      document.getElementById('selectors').className = 'selectors';
      yourTurn = true;

    }else{
      let turn = document.getElementById('turn');
      let sp   = document.createElement('span');
      sp.textContent = 'Your ';
      turn.textContent = 'turn';
      turn.prepend(sp);

      document.getElementById('selectors').className = 'selectors';
      game.fillOpponent(incomingMsg.data); //fill in col from what server sends
      yourTurn = true;
            
    }
        
  };

  var blockAudio = new Audio('ping.mp3');
  blockAudio.volume = 0.4;

  /*Boolean 'yourTurn' manages turns of players, updated on each connect with server*/
  button0.addEventListener('click', function(){
    if(yourTurn && verifyMove(0)){
        let isWin = game.fill(0);
        sendColumn(0, isWin); //uses function to send mssg to server
        blockAudio.play();
    }
  });
  button1.addEventListener('click', function(){
    if(yourTurn && verifyMove(1)){
        let isWin = game.fill(1);
        sendColumn(1, isWin);
        blockAudio.play();
    }
  });
  button2.addEventListener('click', function(){
    if(yourTurn && verifyMove(2)){
        let isWin = game.fill(2);
        sendColumn(2, isWin);
        blockAudio.play();
    }
  });
  button3.addEventListener('click', function(){
    if(yourTurn && verifyMove(3)){
        let isWin = game.fill(3);
        sendColumn(3, isWin);
        blockAudio.play();
    } 
  });
  button4.addEventListener('click', function(){
    if(yourTurn && verifyMove(4)){
        let isWin = game.fill(4);
        sendColumn(4, isWin);
        blockAudio.play();
    }
  });
  button5.addEventListener('click', function(){
    if(yourTurn && verifyMove(5)){
        let isWin = game.fill(5);
        sendColumn(5, isWin);
        blockAudio.play();
    }
  });
  button6.addEventListener('click', function(){
    if(yourTurn && verifyMove(6)){
        let isWin = game.fill(6);
        sendColumn(6, isWin);
        blockAudio.play();
    }
  }); 
  
  function verifyMove(col){
      return game.verifyValidCol(col);
  }
})(); //executres immediately



/*Every second the counter is decreased TO IMPLEMENT*/
/*
let countDown = setInterval(function(){
	game.decreaseTime();
}, 1000);



*/

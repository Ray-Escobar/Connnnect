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
const reset   = document.getElementById('reset');



reset.addEventListener('click', function(){
	game.reset();
});


var yourTurn = false; //if it's true, you are allowed to play
let obj = {'turn': false};
(function setup() {

    //NOTE: this port has to be the same as the one started in server!!!!!!!
    var socket   = new WebSocket("ws://localhost:3200");
    let yourTurn = false;
    
    
     

    /*
    socket.onopen = function(){
        socket.send("Hello from the client!");
    };*/

    function sendColumn(col){
        let outgoingMsg = Messages.O_PICK_A_COLUMN;
        outgoingMsg.data = col;  //column number
        socket.send(JSON.stringify(outgoingMsg));
        yourTurn = false;
        document.getElementById('selectors').className = 'Not-your-turn'; //deactivate glow on selectors
    }

    socket.onmessage = function(mssg){
        let incomingMsg = JSON.parse(mssg.data);
        if(incomingMsg.type == 'PLAYER-JOINED'){
            if(incomingMsg.data === 1){
                game.board.currentColor = 1; //p1 is red
                yourTurn = true;
            } 
            else{
                game.board.currentColor = 2; //p2 is blue
                document.getElementById('selectors').className = 'Not-your-turn';
            }                       
            
        }else if(incomingMsg.type == 'GAME-STARTED'){
            let text = document.querySelector('header p');
            let sp = document.createElement('span');
            text.textContent = 'turn';
            sp.textContent = 'Red\'s ';
            text.prepend(sp);

        }else{
            document.getElementById('selectors').className = 'selectors';
            game.fillOpponent(incomingMsg.data); //fill in col from what server sends
            yourTurn = true;
            
        }
        
    }

    /*Boolean manages turns of players, updated on each connect with server*/
    button0.addEventListener('click', function(){
        if(yourTurn){
            sendColumn(0); //uses function to send mssg to server
            game.fill(0);
        }
        
    });
    button1.addEventListener('click', function(){
        if(yourTurn){
            sendColumn(1);
            game.fill(1);
        }
        
    });
    button2.addEventListener('click', function(){
        if(yourTurn){
            sendColumn(2);
            game.fill(2); 
        }
       
    });
    button3.addEventListener('click', function(){
        if(yourTurn){
            sendColumn(3);
            game.fill(3);
        }
        
    });
    button4.addEventListener('click', function(){
        if(yourTurn){
            sendColumn(4);
            game.fill(4);
        }
        
    });
    button5.addEventListener('click', function(){
        if(yourTurn){
            sendColumn(5);
            game.fill(5);
        }
       
    });
    button6.addEventListener('click', function(){
        if(yourTurn){
            sendColumn(6);
            game.fill(6);   
        }
    });
    
    

})(); //executres immediately



/*Every second the counter is decreased TO IMPLEMENT*/
/*
let countDown = setInterval(function(){
	game.decreaseTime();
}, 1000);



*/

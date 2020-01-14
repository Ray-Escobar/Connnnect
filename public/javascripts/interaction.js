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



(function setup() {

    //NOTE: this port has to be the same as the one started in server!!!!!!!
    var socket = new WebSocket("ws://localhost:3348");


    /*
    socket.onmessage = function(event){
        document.getElementById("hello").innerHTML = event.data;
    }
    socket.onopen = function(){
        socket.send("Hello from the client!");
    };*/

    function sendColumn(col){
        let outgoingMsg = Messages.O_PICK_A_COLUMN;
        outgoingMsg.data = col;  //column number
        socket.send(JSON.stringify(outgoingMsg));
    }
    socket.onmessage = function(mssg){
        //console.log(mssg);
        let incomingMsg = JSON.parse(mssg.data);
        if(incomingMsg.type == 'PLAYER-JOINED'){
            /*to implement, notify player who they are*/
            console.log('You are player ' + incomingMsg.data);
        }else{
            game.fill(incomingMsg.data); //fill in block from what server sends
        }
        
    }




    button0.addEventListener('click', function(){
        sendColumn(0); //uses function to send mssg to server
        game.fill(0);
    });
    button1.addEventListener('click', function(){
        sendColumn(1);
        game.fill(1);
    });
    button2.addEventListener('click', function(){
        sendColumn(2);
        game.fill(2);
    });
    button3.addEventListener('click', function(){
        sendColumn(3);
        game.fill(3);
    });
    button4.addEventListener('click', function(){
        sendColumn(4);
        game.fill(4);
    });
    button5.addEventListener('click', function(){
        sendColumn(5);
        game.fill(5);
    });
    button6.addEventListener('click', function(){
        sendColumn(6);
        game.fill(6);
    });

})(); //executres immediately



/*Every second the counter is decreased TO IMPLEMENT*/
/*
let countDown = setInterval(function(){
	game.decreaseTime();
}, 1000);
*/

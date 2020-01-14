const express = require("express");
const http = require("http");
const websocket = require("ws");

const port = process.argv[2];
const app = express();

const indexRouter = require('./routes/index.js');
const messages = require("./public/javascripts/messages");

const gameStatus = require("./statTracker");
const Game = require("./game");             //import game module

/* -----<======================================>----- */
app.set("view engine", "ejs");  // So we can use the ejs templates
app.use(express.static(__dirname + "/public"));

app.use('/', indexRouter);

var server = http.createServer(app);

const wss = new websocket.Server({ server });
var websockets = {}; //property: websocket, value: game

/*
 * regularly clean up the websockets object
 */
setInterval(function() {
    for (let i in websockets) {
      if (Object.prototype.hasOwnProperty.call(websockets,i)) {
        let gameObj = websockets[i];
        //if the gameObj has a final status, the game is complete/aborted
        if (gameObj.finalStatus != null) {
          delete websockets[i];
        }
      }
    }
  }, 50000);
 
var currentGame = new Game(gameStatus.gamesInitialized++);
var connectionID = 0; //each websocket receives a unique ID
  
wss.on("connection", function(ws) {
  /*
   * two-player game: every two players are added to the same game
   */
  let con = ws;
  con.id = connectionID++;
  let playerNum = currentGame.addPlayer(con); //player is con
  websockets[con.id] = currentGame;

  console.log(
    "Player %s placed in game %s as %s",
    con.id,
    currentGame.id,
    playerNum
  );
  
  /*Send each player if they are P1 or P2*/
  con.send(playerNum == "1" ? messages.S_PLAYER_1 : messages.S_PLAYER_2);

  
  /* once we have two players, there is no way back;
   * a new game object is created;
   * if a player now leaves, the game is aborted (player is not preplaced)
   */
  if (currentGame.hasTwoConnectedPlayers()) {
    console.log('Game Initialized');
    currentGame = new Game(gameStatus.gamesInitialized++);
  }




  con.on("message", function incoming(message) {
    let oMsg = JSON.parse(message);

    let gameObj = websockets[con.id];
    let isPlayer1 = gameObj.player1 == con ? true : false;
    
    console.log("[LOG] " + oMsg.data);
    
    if(isPlayer1){
        gameObj.player2.send((JSON.stringify(oMsg)));
    }else{
        gameObj.player1.send((JSON.stringify(oMsg)));
    }

  });

        
});

server.listen(port);




//let's slow down the server response time a bit to make the change visible on the client side
    /*
    setTimeout(function() {
        console.log("Connection state: "+ ws.readyState);
        
        ws.send("Thanks for the message. --Your server.");
        ws.close();
        console.log("Connection state: "+ ws.readyState);
    }, 2000);*/
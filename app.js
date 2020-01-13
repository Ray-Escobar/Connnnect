const express = require("express");
const http = require("http");
const websocket = require("ws");

const port = process.argv[2];
const app = express();

const indexRouter = require('./routes/index');
const messages = require("./public/javascripts/messages");

const gameStatus = require("./statTracker");
const Game = require("./game");

/* -----<======================================>----- */
app.set("view engine", "ejs");  // So we can use the ejs templates
app.use(express.static(__dirname + "/public"));

app.use('/', indexRouter);

const server = http.createServer(app);
const wss = new websocket.Server({ server });

var websockets = {} // List of all current websockets. property = websocket, value = game

/**
 * Regularly cleans up the websockets object.
 * If the gameObj has a final status, game is finished.
 */
setInterval(() => {
    for (let i in websockets) {
        let gameObj = websockets[i];
        if (gameObj.finalStatus != null)
            delete websockets[i];
    }
}, 60000); // Check once every minute

var currentGame = new Game(gameStatus.gamesInitialized++); //Start new Game and increment gamesInit
var connectionID = 0; // Each websocket has a unique ID

/**
 * When a new player connects...
 */
wss.on("connection", (ws) => {
    // Every 2 players are added to the same game
    let con = ws;
    con.id = connectionID++;
    let playerNum = currentGame.addPlayer(con);
    websockets[con.id] = currentGame;

    console.log(`Player ${con.id} placed in game ${currentGame.id} as P${playerNum}`);
    /**
     * Inform the client about its assigned number
     */
    con.send(playerNum == "1" ? messages.S_PLAYER_1 : messages.S_PLAYER_2);

    /**
     * Once we have two players, prepare new game object
     * and give the greenlight to Player 1
     */
    if (currentGame.hasTwoConnectedPlayers()) {
        currentGame = new Game(gameStatus.gamesInitialized++);
        //TODO: Implement the greenlight for Player 1
    }

    /**
     * Message coming in from a player:
     * 1. From which game?
     * 2. From which player (curPlayer)? To which player (nextPlayer)?
     * 3. Send the message to opposing player (OP)
     */
    con.on("message", (message) => {
        let oMsg = JSON.parse(message);

        let gameObj = websockets[con.id]; //check from which players the message comes
        let curPlayer = con;             
        let nextPlayer = gameObj.player1 == con ? gameObj.player2 : gameObj.player1;

        // If someone picked a column, change turns
        if (oMsg.type == messages.T_PICK_A_COLUMN) {
            nextPlayer.send(message);
            gameObj.setStatus("GAME ON");
        }
        // If someone won update status and stats
        else if (oMsg.type == messages.T_GAME_WON_BY) {
            gameObj.setStatus(oMsg.data);
            gameStatus.gamesCompleted++;
        }
    });

    con.on("close", (code) => {
        /*
        * code 1001 means almost always closing initiated by the client;
        * source: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
        */
        console.log(con.id + " disconnected ...");

        if (code == "1001") {
            let gameObj = websockets[con.id];
            // If it's possible to abort, do so (else game is completed)
            if (gameObj.isValidTransition(gameObj.gameState, "ABORTED")) {
                gameObj.setStatus("ABORTED");
                gameStatus.gamesAborted++;

                // Determine whose connection remain open and close it
                try {
                    gameObj.player1.close();
                    gameObj.player1 = null;
                } catch (e) {
                    console.log("Player 1 closing: " + e);
                }
                try {
                    gameObj.player2.close();
                    gameObj.player2 = null;
                } catch (e) {
                    console.log("Player 2 closing: " + e);
                }
            }
        }
    });
});

server.listen(port);
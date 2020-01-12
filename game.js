/**
 * Every game has two players, identified by their WebSocket
 * a gameID which identifies the game itself and a game state
 * to keep track of the current stage we're at
 * @param {Number} gameID 
 */
var game = function (gameID) {
    this.player1 = null;
    this.player2 = null;
    this.id = gameID;
    this.playersTurn = 1;
    this.gameState = "0 JOINT";
};

/**
 * Possible game states:
 */
game.prototype.transitionStates = {};
game.prototype.transitionStates["0 JOINT"] = 0; // NO PLAYERS HAVE JOINED YET
game.prototype.transitionStates["1 JOINT"] = 1; // 1 PLAYER HAS JOINED
game.prototype.transitionStates["2 JOINT"] = 2; // BOTH PLAYERS HAVE JOINED
game.prototype.transitionStates["GAME ON"] = 3; // FIRST TURN HAS BEEN PLAYED
game.prototype.transitionStates["1"] = 4;       // PLAYER 1 WON THE GAME
game.prototype.transitionStates["B"] = 5;       // PLAYER 2 WON THE GAME
game.prototype.transitionStates["ABORTED"] = 6; // GAME WAS ABORTED
/**
 * Because not every game state can transition to each other,
 * the matrix contains all the valid transitions
 * so that they are checked each time a state change is attempted
 */
game.prototype.transitionMatrix = [
    [0, 1, 0, 0, 0, 0, 0],  //0 JOINT
    [1, 0, 1, 0, 0, 0, 0],  //1 JOINT
    [0, 0, 0, 1, 0, 0, 1],  //2 JOINT
    [0, 0, 0, 1, 1, 1, 1],  //CHAR GUESSED
    [0, 0, 0, 0, 0, 0, 0],  //A WON
    [0, 0, 0, 0, 0, 0, 0],  //B WON
    [0, 0, 0, 0, 0, 0, 0]   //ABORTED
];
/**
 * Verifies whether or not a transition is valid.
 */
game.prototype.isValidTransition = function (from, to) {
    // Checks for right type
    console.assert(
        typeof from == "string",
        "%s: Expecting a string, got a %s",
        arguments.callee.name,
        typeof from
    );
    console.assert(
        typeof to == "string",
        "%s: Expecting a string, got a %s",
        arguments.callee.name,
        typeof to
    );
    // Checks wether game state exists
    console.assert(
        from in game.prototype.transitionStates == true,
        "%s: Expecting %s to be a valid transition state",
        arguments.callee.name,
        from
    );
    console.assert(
        to in game.prototype.transitionStates == true,
        "%s: Expecting %s to be a valid transition state",
        arguments.callee.name,
        to
    );
    // Actually checks if going from current to the next is possible
    let i, j;
    if (!(from in game.prototype.transitionStates)) {
        return false;
    } else {
        i = game.prototype.transitionStates[from];
    }

    if (!(to in game.prototype.transitionStates)) {
        return false;
    } else {
        j = game.prototype.transitionStates[to];
    }

    return game.prototype.transitionMatrix[i][j] > 0;
};
/**
 * Verifies whether or not a state exists
 */
game.prototype.isValidState = function (s) {
    return s in game.prototype.transitionStates;
};
/**
 * Updates the state of the game
 */
game.prototype.setStatus = function (w) {
    // Check whether 'w' is a string
    console.assert(
        typeof w == "string",
        "%s: Expecting a string, got a %s",
        arguments.callee.name,
        typeof w
    );

    if ( // If everything seems right...
        game.prototype.isValidState(w) &&
        game.prototype.isValidTransition(this.gameState, w)
    ) { // go ahead and update it.
        this.gameState = w;
        console.log("[STATUS] %s", this.gameState);
    } else { // Otherwise, throw an error.
        return new Error(
            "Impossible status change from %s to %s",
            this.gameState,
            w
        );
    }
};

// TODO: Set connect-4 specific stuff
game.prototype.switchTurn = function () {
    // Two possible options for the current game state:
    //2 JOINT, GAME ON
    if (this.gameState != "2 JOINT" && this.gameState != "GAME ON") {
        return new Error(
            "Trying to set word, but game status is %s",
            this.gameState
        );
    }
    this.playersTurn = this.playersTurn == 1 ? 2 : 1;
};

game.prototype.getTurn = function () {
    return this.playersTurn;
};

game.prototype.hasTwoConnectedPlayers = function () {
    return this.gameState == "2 JOINT";
};

game.prototype.addPlayer = function (p) {
    console.assert( // Check if 'p' is an Object (WebSocket)
        p instanceof Object,
        "%s: Expecting an object (WebSocket), got a %s",
        arguments.callee.name,
        typeof p
    );
    // If we're not expecting players to be added, throw an error
    if (this.gameState != "0 JOINT" && this.gameState != "1 JOINT") {
        return new Error(
            "Invalid call to addPlayer, current state is %s",
            this.gameState
        );
    }

    // Revise the game state and choose correct
    var error = this.setStatus("1 JOINT");
    if (error instanceof Error) {
        this.setStatus("2 JOINT");
    }
    // If player1 is null assign it, otherwise assign player2
    if (this.player1 == null) {
        this.player1 = p;
        return "1";
    } else {
        this.player2 = p;
        return "2";
    }
};

module.exports = game;
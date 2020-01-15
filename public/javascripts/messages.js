(function(exports) {
  /*
   * Client to server: game is complete, the winner is ...
   */
  exports.T_GAME_WON_BY = "GAME-WON-BY";
  exports.O_GAME_WON_BY = {
    type: exports.T_GAME_WON_BY,
    data: null
  };

  /*
   * Server to client: abort game (e.g. if second player exited the game)
   */
  exports.O_GAME_ABORTED = {
    type: "GAME-ABORTED"
  };
  exports.S_GAME_ABORTED = JSON.stringify(exports.O_GAME_ABORTED);

    /*
   * Server to client: abort game (e.g. if second player exited the game)
   */
  exports.O_GAME_DRAW = {
    type: "GAME-DRAW"
  };
  exports.S_GAME_DRAW = JSON.stringify(exports.O_GAME_DRAW);

  /*
   * Server to client: abort game (e.g. if second player exited the game)
   */
  exports.O_GAME_STARTED = {
    type: "GAME-STARTED",
  };
  exports.S_GAME_STARTED = JSON.stringify(exports.O_GAME_STARTED);

  /*
   * Server to client: you are player number...
   */
  exports.T_PLAYER_JOIN = "PLAYER-JOINED";
  exports.O_PLAYER_1 = {
    type: exports.T_PLAYER_JOIN,
    data: 1
  };
  exports.S_PLAYER_1 = JSON.stringify(exports.O_PLAYER_1);
  // ...
  exports.O_PLAYER_2 = {
    type: exports.T_PLAYER_JOIN,
    data: 2
  };
  exports.S_PLAYER_2 = JSON.stringify(exports.O_PLAYER_2);

  /*
   * Players to server or server to players: column picked
   */
  exports.T_PICK_A_COLUMN = "PICK-COLUMN";
  exports.O_PICK_A_COLUMN = {
    type: exports.T_PICK_A_COLUMN,
    data: null
  };
  //exports.S_PICK_A_COLUMN does not exist, as data needs to be set

  /*
   * Server to Players: game over with result won/loss
   */
  exports.T_GAME_OVER = "GAME-OVER";
  exports.O_GAME_OVER = {
    type: exports.T_GAME_OVER,
    data: null
  };
})(typeof exports === "undefined" ? (this.Messages = {}) : exports);
//if exports is undefined, we are on the client; else the server

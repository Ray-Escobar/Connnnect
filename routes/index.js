var express = require('express');
var router = express.Router();

/* GET splash page. */
router.get('/', function(req, res, next) {
  res.sendFile("game.html", { root: "./public" });
});
router.get('/splash', function(req, res, next) {
  res.sendFile("splash.html", { root: "./public" });
});

/* GET game page */
router.get('/game', function(req, res, next) {
  res.sendFile("game.html", { root: "./public" });
});



module.exports = router;


// /* Pressing the 'PLAY' button, returns this page */
// router.get("/play", function(req, res) {
//   res.sendFile("game.html", { root: "./public" });
// });

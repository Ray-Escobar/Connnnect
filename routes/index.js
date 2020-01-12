var express = require('express');
var router = express.Router();

/* GET game page */
router.get('/game', function(req, res, next) {
  res.sendFile("game.html", { root: "./public" });
});

/* GET splash page. */
router.get('/', function(req, res, next) {
  res.sendFile("splash.html", { root: "./public" });
});
router.get('/splash', function(req, res, next) {
  res.sendFile("splash.html", { root: "./public" });
});
router.get('/*', function(req, res, next) {
  res.sendFile("splash.html", { root: "./public" });
});



module.exports = router;
var express = require('express');
var router = express.Router();

// TODO: to be removed? temp for view
// GET /game
router.get('/', function(req, res, next) {
  res.render('gameRoom', { title: 'UNO - Game Room' });
});

// TODO: implement restful pattern
// GET /game/:gameId
// router.get('/:gameId', function(req, res, next) {
//   res.render('gameRoom', { title: 'UNO - Game Room ID' });
// });

// TODO: should make routes this way? 
// GET /game/end
router.get('/end', function( req, res, next ) {
  res.render('endgamepage', { title: 'UNO - End Game' });
});

module.exports = router;

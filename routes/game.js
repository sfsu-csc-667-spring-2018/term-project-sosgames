const express = require('express');
const router = express.Router();
const { Games } = require('../database');


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

router.post('/', (request, response) => {
  // console.log(request.body);
  console.log(request);
  let errors = [];

  // function return array takes in request object to check data
  if(request.body.numberOfPlayers < 2 || request.body.numberOfPlayers > 12){
    errors.push({ msg: '2-12 Players required' });
  }

  // possible feature if we have time
  // if(request.body.password != request.body.confirmPassword){
  //   errors.push({ msg: 'Passwords do not match' });
  // }

  // checks errors array that comes back 
  if(errors.length > 0){
    response.render('creategame', { 
      title: 'UNO - Lobby',
      errors: errors,
      gameName: request.body.gameName,
    });
  }else {
    Games.createGame( request.body.gameName, request.body.numberOfPlayers );
    response.render('gameRoom', { title: 'UNO - Game Room' });
  }
});

module.exports = router;

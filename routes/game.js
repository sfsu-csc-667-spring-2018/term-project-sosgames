const express = require('express');
const router = express.Router();
const gameLogic = require('../gameLogic');
const auth = require('../auth/requireAuthentication');

// const { Card, Game, User } = require('../database');

/**
 * CREATE GAME
 */
// GET /game -- Go to create game page
router.get('/', auth.requireAuthentication, function(request, response, next) {
  // DEBUG
  // gameLogic.draw();
  // gameLogic.draw2();

  response.render('createGame', {
    title: 'UNO - Create Game'
  });
});

// POST /game -- Create a new game
router.post('/', function(request, response, next) {
  response.render('createGame', {
    title: 'UNO - Create Game'
  });
  // TODO: redirect to GET /game/:gameId
});

/**
 * GO TO SPECIFIC GAME ROOM
 */
// GET /game/:gameId -- Spectator or gameroom creator goes to a specific game room
router.get('/:gameId', function(request, response, next) {
  let gameId = request.params.gameId;

  // Game.findById(gameId)
  // .then(game => {

  // })
  // .catch(error => {

  // })

  response.render('gameRoom', {
    title: 'UNO - Game Room ' + gameId
  });
});

// POST /game/:gameId -- A new player joins a specific game room
router.post('/:gameId', function(request, response, next) {
  let gameId = request.params.gameId;
  response.render('gameRoom', {
    title: 'UNO - Game Room ' + gameId
  });
});

/**
 * GAME LOGIC
 */
// POST /game/:gameId/draw -- Player requests a card from draw pile
router.post('/:gameId/draw', function(request, response, next) {
  let gameId = request.params.gameId;
  response.render('gameRoom', {
    title: 'UNO - Game Room ' + gameId
  });
});

// POST /game/:gameId/play -- Player plays a card from their hand
router.post('/:gameId/play', function(request, response, next) {
  let gameId = request.params.gameId;
  let { cardValue } = request.body;

  // TODO: Game.validateMove(stuff).then(io stuff).catch(err)
  request.app.io.of(`/game/${gameId}`).emit('update', {
    gameId,
    cardValue
  });

  response.sendStatus(200);
});

/**
 * MESSAGING IN A SPECIFIC GAME ROOM
 */
// POST /game/:gameId/message -- Posting a message to game room
router.post('/:gameId/chat', function(request, response, next) {
  response.render('gameRoom', {
    title: 'UNO - Chat'
  });
});

/**
 * GAME ENDS
 */
// GET /game/:gameId/end -- Going to game end page
router.get('/:gameId/end', function(request, response, next) {
  response.render('endGame', {
    title: 'UNO - End Game'
  });
});

module.exports = router;

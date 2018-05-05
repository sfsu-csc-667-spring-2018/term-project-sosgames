const express = require('express');
const router = express.Router();
const GameEngine = require('../gameEngine');
// const { Card, Game, User } = require('../database');

/**
 * CREATE GAME
 */
// GET /game -- Go to create game page
router.get('/', function(request, response, next) {
  response.render('createGame', {
    title: 'UNO - Create Game'
  });
});

// POST /game -- Create a new game
router.post('/', function(request, response, next) {
  // add new game to games table 
  // - Games.create(gameName, numberOfPlayers); --> obtain game.id

  // add the player who created the game to users_games table
  // - UsersGames.create(user.id, game.id);

  // populate initial games_cards table
  // - GamesCards.create(game.id)

  response.render('gameRoom', {
    title: 'UNO - Create Game'
  });
  // TODO: redirect to GET /game/:gameId
});

/**
 * GO TO SPECIFIC GAME ROOM
 */
// GET /game/:gameId -- A user goes to a specific game room
router.get('/:gameId', function(request, response, next) {
  let gameId = request.params.gameId;

  // Get all users by gameId in users_games
  // - UsersGames.findUserByGameId(gameId)

  // Get all on top cards by gameId in games_cards
  // - GamesCards.findTopCardByGameId(gameId)

  response.render('gameRoom', {
    title: 'UNO - Game Room ' + gameId
  });
});

// POST /game/:gameId -- A new player joins a specific game room
router.post('/:gameId', function(request, response, next) {
  let gameId = request.params.gameId;

  // add the new player to users_games table
  // - UsersGames.create(user.id, game.id);

  // TODO: redirect to GET /game/:gameId

  // TODO: wrong, rm
  response.render('gameRoom', {
    title: 'UNO - Game Room ' + gameId
  });
});

/**
 * GAME LOGIC
 */
// POST /game/:gameId/start -- Player requests to start the game
router.post('/:gameId/start', function(request, response, next) {
  let gameId = request.params.gameId;
  let { clientSocketId } = request.body;
  let readyToStart = false;

  // Find user.id and current number of players in users_games
  // - UsersGames.findByGameId(gameId)
  let numberOfPlayers = 2;
  let players = [
    {id: 1, username: 'test username 1'},
    {id: 2, username: 'test username 2'},
    {id: 3, username: 'test username 3'}
  ];

  // Check if 2 <= number of players <= max_number_of_players in games table
  // - Games.findById(gameId)
  let maxNumberOfPlayers = 5;
  if (numberOfPlayers >= 2 && numberOfPlayers <= maxNumberOfPlayers) {
    readyToStart = true;
  }

  // If not valid --> app.io.emit('not ready')

  // Else --> start dealing
  // - GamesCards.findById(gameId)
  // Pick randomly 7 cards for each player by updating games_cards table
  // -- GamesCards.dealToUser(gameId, user.id, card.id) --> set in_hand = true
  // Pick randomly 1 numbered card for on top from games_cards table
  // -- GamesCards.pickOnTop(gameId) --> set on_top = true
  
  if (readyToStart) {
    // - cardsInGame = GamesCards.findCardsByGameId(gameId) + Cards.getCards()
    let cardsInGame = [
      {id: 1, inHand: false, inDeck: false, onTop: false, value:'2', color: 'red'},
      {id: 2, inHand: false, inDeck: false, onTop: false, value:'5', color: 'blue'},
      {id: 3, inHand: false, inDeck: false, onTop: false, value:'wild', color: 'wild'},
      {id: 4, inHand: false, inDeck: false, onTop: false, value:'reverse', color: 'yellow'},
      {id: 5, inHand: false, inDeck: false, onTop: false, value:'1', color: 'yellow'},
      {id: 6, inHand: false, inDeck: false, onTop: false, value:'4', color: 'green'},
    ];
    
    // Pick 1 card on top
    let cardOnTop = GameEngine.selectCardOnTop(cardsInGame);
    // console.log(JSON.stringify(cardOnTop));
    // TODO: Update games_cards table

    // Send game state to game room
    request.app.io
    .of(`/game/${gameId}`)
    .emit('ready to start game', cardOnTop);
    
    // console.log(request.app.io.sockets.sockets);
    
    console.log('in routes: socket.id='+clientSocketId);

    request.app.io.to(clientSocketId).emit('yo');
    // Deal to each player
    // players.forEach((player) => {
      // TODO: Update games_cards table

    //   // Send 7 cards to each player's hand
    //   request.app.io
    //   .of(`/game/${gameId}`)
    //   .emit('update hand', { gameId });
    // });

  } else {
    request.app.io
    .of(`/game/${gameId}`)
    .emit('not ready to start game');
  }

  response.sendStatus(200);
});

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
  let { cardValue, clientSocketId } = request.body;
  // TODO: Game.validateMove(stuff).then(io stuff).catch(err)
  request.app.io
    .of(`/game/${gameId}`)
    .emit('update game', { gameId, cardValue });

  response.sendStatus(200);
});

/**
 * MESSAGING IN A SPECIFIC GAME ROOM
 */
// POST /game/:gameId/message -- Posting a message to game room
router.post('/:gameId/chat', function( request, response, next ) {
  response.render('gameRoom', {
    title: 'UNO - Chat'
  });
});

/**
 * GAME ENDS
 */
// GET /game/:gameId/end -- Going to game end page
router.get('/:gameId/end', function( request, response, next ) {
  response.render('endGame', {
    title: 'UNO - End Game'
  });
});

module.exports = router;
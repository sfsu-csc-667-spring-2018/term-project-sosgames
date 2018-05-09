const express = require('express');
const router = express.Router();
const { Cards, Games, UsersGames, GamesCards } = require('../database');
const auth = require('../auth/requireAuthentication');
const GameEngine = require('../gameEngine');

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
router.post('/', auth.requireAuthentication, (request, response, next) => {
  const { gameName, numberOfPlayers } = request.body;

  Games.create(gameName, numberOfPlayers)
    .then(gameData => {
      response.redirect(`/game/${gameData.id}`);
    })
    .catch(error => {
      response.render('createGame', {
        title: 'UNO - Create Game',
        errors: 'Unable to create game'
      });
    });
});

/**
 * GO TO SPECIFIC GAME ROOM
 */
// GET /game/:gameId -- A user goes to a specific game room
router.get(
  '/:gameId',
  auth.requireAuthentication,
  (request, response, next) => {
    let gameId = request.params.gameId;
    let user = request.user;
    let isPlayer = false;

    Games.findById(gameId)
      .then(game => {
        UsersGames.findUserByUserIdAndGameId(user.id, game.id)
          .then(user => {
            isPlayer = true;
          })
          .catch(error => {});

        response.render('gameRoom', {
          title: `UNO - Game ${game.id}`,
          isPlayer: isPlayer,
          username: user.username,
          userId: user.id
        });
      })
      .catch(error => {
        request.flash('error', 'Game does not exist.');
        response.redirect('/lobby');
      });
  }
);

// POST /game/:gameId -- A new player joins a specific game room
router.post('/:gameId', (request, response, next) => {
  let gameId = request.params.gameId;

  // add the new player to users_games table
  // - UsersGames.create(user.id, game.id);

  response.render('gameRoom', {
    title: `UNO - Game ${game.id}`,
    username: user.username,
    userId: user.id,
    isPlayer: true
  });
});

/**
 * GAME LOGIC
 */
// POST /game/:gameId/start -- Player requests to start the game
router.post('/:gameId/start', (request, response, next) => {
  let gameId = request.params.gameId;
  let { clientSocketId, privateRoom } = request.body;
  let readyToStart = false;

  // Find user.id and current number of players in users_games
  // - UsersGames.findByGameId(gameId)
  let numberOfPlayers = 2;
  let players = [{ id: 1, username: 'dude' }, { id: 2, username: 'khanh' }];

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
      {
        id: 1,
        inHand: false,
        inDeck: false,
        onTop: false,
        value: '2',
        color: 'red'
      },
      {
        id: 2,
        inHand: false,
        inDeck: false,
        onTop: false,
        value: '5',
        color: 'blue'
      },
      {
        id: 3,
        inHand: false,
        inDeck: false,
        onTop: false,
        value: 'wild',
        color: 'wild'
      },
      {
        id: 4,
        inHand: false,
        inDeck: false,
        onTop: false,
        value: 'reverse',
        color: 'yellow'
      },
      {
        id: 5,
        inHand: false,
        inDeck: false,
        onTop: false,
        value: '1',
        color: 'yellow'
      },
      {
        id: 6,
        inHand: false,
        inDeck: false,
        onTop: false,
        value: '4',
        color: 'green'
      }
    ];

    // Pick 1 card on top
    let cardOnTop = GameEngine.selectCardOnTop(cardsInGame);
    // TODO: Update games_cards table

    // Send game state to game room
    // request.app.io.of(`/game/${gameId}`).emit('ready to start game', cardOnTop);

    let rooms = request.app.io.sockets.adapter.rooms;
    let playersRooms = [];
    Object.keys(rooms).forEach(function(room) {
      if (room.includes(`/game/${gameId}/`)) {
        playersRooms.push(room);
        // let roomName = room.split('/');
        // let userId = roomName[3];
        // console.log(userId);
      }
    });

    console.log(playersRooms);

    // TODO: deal card for each player
    // grab user id from room
    // use game engine to deal cards by user.id and card.id
    playersRooms.forEach(function(playerRoom) {});
    // request.app.io
    //   .to(playerHand)
    //   .emit('yo', { hello: `${clientSocketId} in room ${playerHand}` });
  } else {
    request.app.io.of(`/game/${gameId}`).emit('not ready to start game');
  }

  response.sendStatus(200);
});

// POST /game/:gameId/draw -- Player requests a card from draw pile
router.post('/:gameId/draw', (request, response, next) => {
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
router.post('/:gameId/chat', (request, response, next) => {
  let { message } = request.body;
  let user = request.user.username;

  let gameId = request.params.gameId;
  // console.log('recieved chat message : ' + message);

  request.app.io.of(`/game/${gameId}`).emit('message', {
    gameId,
    message,
    user
  });

  response.sendStatus(200);
});

/**
 * GAME ENDS
 */
// GET /game/:gameId/end -- Going to game end page
router.get(
  '/:gameId/end',
  auth.requireAuthentication,
  (request, response, next) => {
    response.render('endGame', {
      title: 'UNO - End Game'
    });
  }
);

module.exports = router;

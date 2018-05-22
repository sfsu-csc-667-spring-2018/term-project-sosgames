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
  response.render('createGame', {
    title: 'UNO - Create Game'
  });
});

// POST /game -- Create a new game
router.post('/', auth.requireAuthentication, (request, response, next) => {
  const { gameName, numberOfPlayers } = request.body;
  let user = request.user;

  Games.create(gameName, numberOfPlayers)
    .then(gameData => {
      GamesCards.create(gameData.id)
        .then(() => {
          request.app.io.of('lobby').emit('games', {
            id: gameData.id,
            name: gameData.name,
            max_number_of_players: gameData.max_number_of_players
          });
          response.redirect(`/game/${gameData.id}`);
        })
        .catch(error => {
          console.log(error);
        });
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

    Games.verifyUserAndGame(gameId, user)
      .then(userAndGameData => {
        let game = userAndGameData.game;

        let playerInGame = userAndGameData.playerInGame;
        let username = playerInGame.username;
        let userId = playerInGame.id;

        let renderData = {
          title: `UNO - Game ${gameId}`,
          username: username,
          userId: userId,
          isStarted: false
        };

        Games.getGameStateAndAPlayerHand(gameId, userId)
          .then(gameStateData => {
            if (game.current_player_index !== -1) {
              renderData.isStarted = true;
              renderData.cardOnTop = gameStateData.cardOnTop;
              renderData.playerHand = gameStateData.playerHand;
            }
            renderData.game = game;
            renderData.players = gameStateData.players;

            // io.emit new player for gameroom namespace: /game/:gameId
            // I AM HERE
            request.app.io.of(`/game/${gameId}`).emit('player view update', {
              players: gameStateData.players
            });

            response.render('gameRoom', renderData);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        request.flash('error', 'Cannot enter game.');
        response.redirect('/lobby');
      });
  }
);

/**
 * GAME LOGIC
 */
// POST /game/:gameId/start -- Player requests to start the game
router.post('/:gameId/start', (request, response, next) => {
  let gameId = request.params.gameId;

  Games.isValidToStart(gameId)
    .then(gameData => {
      Games.getStartGameState(gameId)
        .then(startGameStateData => {
          // Figure out who's current player from startGameStateData
          console.log(startGameStateData);

          let cardOnTop = startGameStateData.cardOnTop;
          let playersHands = startGameStateData.playersHands;

          // Get players' private rooms in the same game
          let rooms = request.app.io.sockets.adapter.rooms;
          let playersRooms = [];
          Object.keys(rooms).forEach(function(room) {
            if (room.includes(`/game/${gameId}/`)) {
              let userId = room.split('/')[3];
              let playerInRoom = {};

              playerInRoom.room = room;
              playerInRoom.userId = userId;
              playersRooms.push(playerInRoom);
            }
          });

          // Send game state to game room
          request.app.io
            .of(`/game/${gameId}`)
            .emit('ready to start game', cardOnTop);

          // Send cards to each hand
          for (const playerRoom of playersRooms) {
            let cardsInPlayerHand = playersHands[playerRoom.userId];
            request.app.io
              .to(playerRoom.room)
              .emit('update hand', cardsInPlayerHand);
          }
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
      request.app.io.of(`/game/${gameId}`).emit('not ready to start game');
    });

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
  let user = request.user;
  let { cardId, cardOnTopId } = request.body;

  // this should update cards in games stuff
  Games.playCard(gameId, user.id, cardId, cardOnTopId)
    .then(newGameStateData => {
      console.log(newGameStateData);
      console.log('yep dude');
      let newCardOnTop = newGameStateData.newCardOnTop;
      console.log(newCardOnTop);

      // TODO: get new game state, emit to gameroom and private socket accordingly
      request.app.io.of(`/game/${gameId}`).emit('update', {
        gameId,
        newCardOnTop
      });
    })
    .catch(error => {
      console.log(error);
      console.log('so alright');
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

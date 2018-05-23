const express = require('express');
const router = express.Router();
const { Cards, Games, UsersGames, GamesCards } = require('../database');
const auth = require('../auth/requireAuthentication');

router.get('/', auth.requireAuthentication, function(request, response, next) {
  response.render('createGame', {
    title: 'UNO - Create Game'
  });
});

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
        .catch(error => {});
    })
    .catch(error => {
      response.render('createGame', {
        title: 'UNO - Create Game',
        errors: 'Unable to create game'
      });
    });
});

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

            request.app.io.of(`/game/${gameId}`).emit('update player view', {
              players: gameStateData.players
            });

            response.render('gameRoom', renderData);
          })
          .catch(error => {});
      })
      .catch(error => {
        request.flash('error', 'Cannot enter game.');
        response.redirect('/lobby');
      });
  }
);

router.post('/:gameId/start', (request, response, next) => {
  let gameId = request.params.gameId;

  Games.isValidToStart(gameId)
    .then(gameData => {
      Games.getStartGameState(gameId)
        .then(startGameStateData => {
          let cardOnTop = startGameStateData.cardOnTop;
          let playersHands = startGameStateData.playersHands;
          let players = startGameStateData.players;

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

          request.app.io
            .of(`/game/${gameId}`)
            .emit('ready to start game', cardOnTop);

          request.app.io
            .of(`/game/${gameId}`)
            .emit('update which active player', { players });

          for (const playerRoom of playersRooms) {
            let cardsInPlayerHand = playersHands[playerRoom.userId];
            request.app.io
              .to(playerRoom.room)
              .emit('update hand on start', cardsInPlayerHand);
          }
        })
        .catch(error => {});
    })
    .catch(error => {
      request.app.io.of(`/game/${gameId}`).emit('not ready to start game');
    });

  response.sendStatus(200);
});

router.post('/:gameId/draw', (request, response, next) => {
  let gameId = request.params.gameId;

  response.render('gameRoom', {
    title: 'UNO - Game Room ' + gameId
  });
});

router.post('/:gameId/play', function(request, response, next) {
  let gameId = request.params.gameId;
  let user = request.user;
  let { cardId, wildColor } = request.body;

  GamesCards.playCard(gameId, cardId, user.id, wildColor)
    .then(newCardOnTop => {
      Games.play(gameId)
        .then(data => {
          Games.getGameState(gameId)
            .then(newGameStateData => {
              let players = newGameStateData.players;
              let playersHands = newGameStateData.playersHands;

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

              request.app.io
                .of(`/game/${gameId}`)
                .emit('update which active player', { players });

              for (const playerRoom of playersRooms) {
                let cardsInPlayerHand = playersHands[playerRoom.userId];
                request.app.io
                  .to(playerRoom.room)
                  .emit('update hand after play', cardsInPlayerHand);
              }
            })
            .catch(error => {});
        })
        .catch(error => {});

      request.app.io.of(`/game/${gameId}`).emit('update new card on top', {
        gameId,
        newCardOnTop
      });
    })
    .catch(error => {});

  response.sendStatus(200);
});

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

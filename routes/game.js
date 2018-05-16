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

    // Games.doThing(gameId, user)
    //   .then(({ game, user }) => {
    //     response.render('game')
    //   })
    //   .catch( error => {
    //     response.redirect('lobby')
    //   })

    Games.findById(gameId)
      .then(game => {
        // Find existing user in game
        UsersGames.findUserByUserIdAndGameId(user.id, game.id)
          .then(userGameData => {
            response.render('gameRoom', {
              title: `UNO - Game ${game.id}`,
              isPlayer: true,
              username: user.username,
              userId: user.id
            });
          })
          .catch(error => {
            UsersGames.findByGameId(gameId)
              .then(usersGamesData => {
                let numberOfPlayers = usersGamesData.length + 1;

                if (
                  numberOfPlayers >= 1 &&
                  numberOfPlayers <= game.max_number_of_players
                ) {
                  // Create new player for a game
                  UsersGames.create(user.id, gameId).then(userInGame => {
                    response.render('gameRoom', {
                      title: `UNO - Game ${gameId}`,
                      username: user.username,
                      userId: user.id,
                      isPlayer: true
                    });
                  });
                } else {
                  request.flash(
                    'error',
                    `Game Room ${game.name} is already full.`
                  );
                  response.redirect('/lobby');
                }
              })
              .catch(error => {
                // Create new player for a game
                UsersGames.create(user.id, gameId)
                  .then(userInGame => {
                    response.render('gameRoom', {
                      title: `UNO - Game ${gameId}`,
                      username: user.username,
                      userId: user.id,
                      isPlayer: true
                    });
                  })
                  .catch(error => {
                    console.log(error);
                    response.redirect('/lobby');
                  });
              });
          });
      })
      .catch(error => {
        request.flash('error', 'Game does not exist.');
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
  let { clientSocketId, privateRoom } = request.body;

  let readyToStart = false;
  let numberOfPlayers = 0,
    maxNumberOfPlayers = 0;
  let players = [];

  Games.findById(gameId).then(gameData => {
    maxNumberOfPlayers = gameData.max_number_of_players;

    UsersGames.findByGameId(gameId).then(usersGamesData => {
      // Check if valid number of players to start
      numberOfPlayers = usersGamesData.length;
      if (numberOfPlayers >= 2 && numberOfPlayers <= maxNumberOfPlayers) {
        readyToStart = true;
      }

      if (readyToStart) {
        // Get all players' ids in game
        for (const userGame of usersGamesData) {
          let player = {
            userId: userGame.user_id,
            numberOfCards: userGame.number_of_cards
          };
          players.push(player);
        }

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

        GamesCards.findAllCardsInGame(gameId)
          .then(cardsInGame => {
            // Pick 1 card on top
            let cardOnTop = GameEngine.selectCardOnTop(cardsInGame);
            cardsInGame.splice(cardOnTop[0], 1);
            // Update games_cards (gameId, cardOnTop.card_id, cardOnTop.on_top)

            // Send game state to game room
            request.app.io
              .of(`/game/${gameId}`)
              .emit('ready to start game', cardOnTop[1]);

            // Deal cards
            let cardsInHands = GameEngine.dealCards(
              cardsInGame,
              usersGamesData
            );

            // Send cards to each hand
            for (const playerRoom of playersRooms) {
              let cardsInPlayerHand = cardsInHands[playerRoom.userId];
              request.app.io
                .to(playerRoom.room)
                .emit('update hand', cardsInPlayerHand.cards);
            }

            // TODO: Update users_games(number_of_cards=7) and games_cards(on_top, in_hand, user_id) tables
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        request.app.io.of(`/game/${gameId}`).emit('not ready to start game');
      }
    });
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

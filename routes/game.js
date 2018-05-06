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
router.post('/', (request, response) => {
  console.log(request.body);
  // console.log(request);
  let errors = [];

  // function return array takes in request object to check data
  if (request.body.numberOfPlayers < 2 || request.body.numberOfPlayers > 12) {
    errors.push({ msg: '2-12 Players required' });
  }

  // possible feature if we have time
  // if(request.body.password != request.body.confirmPassword){
  //   errors.push({ msg: 'Passwords do not match' });
  // }
  // checks errors array that comes back
  if (errors.length > 0) {
    response.render('creategame', {
      title: 'UNO - Lobby',
      errors: errors,
      gameName: request.body.gameName
    });
  } else {
    // Games.create(request.body.gameName, request.body.numberOfPlayers)
    //   .then(
    //     console.log("here also")
    //   )
    //     .catch( console.log('failed to add to database'));

    // Games.findById(2)
    //   .then(
    //     data => {
    //       console.log(data)
    //     }
    //   )
    //   .catch(
    //     error => {
    //       console.log("doesn't work" + error)
    //     }
    //   );

    // Games.incrementRoundNumber(1);

    // Games.changeGameDirection(1);

    // Games.changeWinnerId(2,1);

    // UsersGames.create(1,3);

    // UsersGames.findByUserId(1)
    // .then(
    //   data => {
    //     console.log(data)
    //   }
    // )
    // .catch(
    //   error => {
    //     console.log("doesn't work" + error)
    //   }
    // );

    // UsersGames.findByGameId(2)
    //   .then(
    //     data => {
    //       console.log(data)
    //     }
    //   )
    //   .catch(
    //     error => {
    //       console.log("doesn't work" + error)
    //     }
    //   );

    // UsersGames.findByUserAndGameId(1,2)
    //   .then(
    //     data => {
    //       console.log(data)
    //     }
    //   )
    //   .catch(
    //     error => {
    //       console.log("doesn't work" + error)
    //     }
    //   );

    // Cards.getAll()
    //   .then((cards) => {
    //     console.log(cards);
    //   }
    // )

    // Cards.findById(4)
    //   .then((card) => {
    //       console.log(card);
    //     }
    //   )

    GamesCards.create(1);

    response.render('gameRoom', { title: 'UNO - Game Room' });
  }
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
// POST /game/:gameId/start -- Player requests to start the game
router.post('/:gameId/start', function(request, response, next) {
  let gameId = request.params.gameId;
  let { clientSocketId, privateRoom } = request.body;
  // TODO: get privateRooms somehow...
  // maybe do sth like io.users[idInSameNamespace]

  let readyToStart = false;

  // Find user.id and current number of players in users_games
  // - UsersGames.findByGameId(gameId)
  let numberOfPlayers = 2;
  let players = [
    { id: 1, username: 'test username 1' },
    { id: 2, username: 'test username 2' },
    { id: 3, username: 'test username 3' }
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
    // console.log(JSON.stringify(cardOnTop));
    // TODO: Update games_cards table

    // Send game state to game room
    // request.app.io
    // .of(`/game/${gameId}`)
    // .emit('ready to start game', cardOnTop);

    // private socket working
    // TODO: deal card for each player
    request.app.io
      .to(privateRoom)
      .emit('yo', { hello: `${clientSocketId} in room ${privateRoom}` });

    // Deal to each player
    // players.forEach((player) => {
    // TODO: Update games_cards table

    //   // Send 7 cards to each player's hand
    //   request.app.io
    //   .to(privateRoom)
    //   .emit('update hand', { gameId });
    // });
  } else {
    request.app.io.of(`/game/${gameId}`).emit('not ready to start game');
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
router.get('/:gameId/end', function(request, response, next) {
  response.render('endGame', {
    title: 'UNO - End Game'
  });
});

module.exports = router;

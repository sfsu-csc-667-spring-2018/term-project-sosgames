const database = require('../connection');
const gamesCards = require('../gamesCards');
const usersGames = require('../usersGames');
const findById = require('./findGameById').findById;
const findCurrentPlayerIndexById = require('./findCurrentPlayerIndexByGameId')
  .findCurrentPlayerIndexById;
const nextPlayerTurn = require('./nextPlayerTurn').nextPlayerTurn;
const changeGameDirection = require('./changeGameDirection')
  .changeGameDirection;
const getNextPlayerIndex = require('./getNextPlayerIndex');

const drawCardsAndSkip = (gameId, players, numberOfCardsToDraw) => {
  return getNextPlayerIndex(gameId).then(nextIndex => {
    let nextUserId = -1;
    for (const [index, player] of players.entries()) {
      if (index === nextIndex) {
        nextUserId = player.user_id;
      }
    }

    return Promise.all([
      gamesCards.draw(gameId, nextUserId, numberOfCardsToDraw),
      nextPlayerTurn(gameId)
    ]);
  });
};

const play = gameId => {
  return Promise.all([
    gamesCards.findTopCardByGameId(gameId),
    gamesCards.findAllCardsInHandsById(gameId),
    gamesCards.findAllCardsInDeckById(gameId),
    usersGames.findByGameId(gameId),
    findCurrentPlayerIndexById(gameId)
  ]).then(([cardOnTop, hands, cardsInDeck, players, index]) => {
    // Game logic - check cardOnTop
    // - next turn
    // - direction
    // - number of cards for next person (+ next next person???)

    return changeGameDirection(gameId).then(() => {
      return nextPlayerTurn(gameId);
    });
    // switch (cardOnTop.value) {
    //   case 'reverse':
    //     return changeGameDirection(gameId)
    //     .then(() => {
    //       return nextPlayerTurn(gameId);
    //     });
    //     break;

    //   case 'draw-two':
    //     if (cardsInDeck.length > 2) {
    //       return drawCardsAndSkip(gameId, players, 2);
    //     } else {
    //       return gamesCards.resetDeck(gameId)
    //         .then(() => {
    //           return drawCardsAndSkip(gameId, players, 2);
    //         });
    //     }
    //     break;

    //   case 'wild':
    //   case 'wild-draw-four':
    //   break;

    //   default:
    //     return nextPlayerTurn(gameId);
    //     break;
    // }

    // return players;
  });
};

module.exports = play;

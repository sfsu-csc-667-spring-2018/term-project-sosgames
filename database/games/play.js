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
  return getNextPlayerIndex(gameId, true).then(nextIndex => {
    let nextUserId = -1;
    for (const [index, player] of players.entries()) {
      if (index === nextIndex) {
        nextUserId = player.user_id;
      }
    }

    return gamesCards.draw(gameId, nextUserId, numberOfCardsToDraw).then(() => {
      return nextPlayerTurn(gameId);
    });
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
    switch (cardOnTop.value) {
      case 'reverse':
        return changeGameDirection(gameId).then(() => {
          return nextPlayerTurn(gameId);
        });
        break;

      case 'draw-two':
        if (cardsInDeck.length > 2) {
          return drawCardsAndSkip(gameId, players, 2);
        } else {
          return gamesCards.resetDeck(gameId).then(() => {
            return drawCardsAndSkip(gameId, players, 2);
          });
        }
        break;

      case 'wild-draw-four':
        if (cardsInDeck.length > 4) {
          console.log('deck>2 wd4');
          return drawCardsAndSkip(gameId, players, 4);
        } else {
          console.log('deck<1 wd4');
          return gamesCards.resetDeck(gameId).then(() => {
            return drawCardsAndSkip(gameId, players, 4);
          });
        }
        break;

      default:
        // normal case + skip + wild
        return nextPlayerTurn(gameId);
        break;
    }
  });
};

module.exports = play;

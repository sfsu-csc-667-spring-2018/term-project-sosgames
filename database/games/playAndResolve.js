const database = require('../connection');
const gamesCards = require('../gamesCards');
const usersGames = require('../usersGames');
const findById = require('./findGameById').findById;

const playAndResolve = gameId => {
  return Promise.all([
    gamesCards.findTopCardByGameId(gameId),
    gamesCards.findByGameId(gameId),
    usersGames.findByGameId(gameId)
  ]).then(([cardOnTop, players]) => {
    switch (cardOnTop.value) {
      case 'skip':
        break;

      case 'reverse':
        break;

      case 'draw-two':
        break;

      case 'wild':
      case 'wild-draw-four':
        break;

      default:
        break;
    }

    // TODO return more stuff
    return { game, players, playerHand };
  });
};

module.exports = playAndResolve;

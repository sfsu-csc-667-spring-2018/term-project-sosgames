const database = require('../connection');
const gamesCards = require('../gamesCards');
const usersGames = require('../usersGames');
const findById = require('./findGameById').findById;

const playAndResolve = (gameId, userId, cardId, cardOnTopId) => {
  return Promise.all([]).then(() => {
    return Promise.all([]).then(([newCardOnTop, game]) => {
      // TODO: update players turn, game direction, and number of cards for players(if draw)
      // update wild color???
      switch (newCardOnTop.value) {
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

      let currentPlayerIndex = game.current_player_index;
      return { newCardOnTop, game };
    });
  });
};

module.exports = playAndResolve;

const database = require('../connection');
const gamesCards = require('../gamesCards');
const usersGames = require('../usersGames');
const findById = require('./findGameById').findById;

const playCard = (gameId, userId, cardId, cardOnTopId) => {
  return Promise.all([
    gamesCards.changeInDeck(false, gameId, cardOnTopId),
    gamesCards.changeInHand(false, gameId, cardOnTopId),
    gamesCards.changeOnTop(false, gameId, cardOnTopId),
    gamesCards.changeUserIdToNull(gameId, cardOnTopId),

    gamesCards.changeInDeck(false, gameId, cardId),
    gamesCards.changeInHand(false, gameId, cardId),
    gamesCards.changeOnTop(true, gameId, cardId),
    gamesCards.changeUserIdToNull(gameId, cardId),

    usersGames.decrementNumberOfCardsById(userId, gameId)
  ]).then(() => {
    return Promise.all([
      gamesCards.findCardById(cardId, gameId),
      findById(gameId)
    ]).then(([newCardOnTop, game]) => {
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

module.exports = playCard;

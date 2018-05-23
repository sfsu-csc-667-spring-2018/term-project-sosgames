const database = require('../connection');

const findTopCardByGameId = require('./findTopCardByGameId');
const changeWildColorToNull = require('./changeWildColorToNull');
const changeUserIdToNull = require('./changeUserIdToNull');
const changeInDeck = require('./changeInDeck');
const changeInHand = require('./changeInHand');
const changeOnTop = require('./changeOnTop');
const changeWildColorToBlueByGameAndCardId = require('./changeWildColorToBlueByGameAndCardId');
const changeWildColorToGreenByGameAndCardId = require('./changeWildColorToGreenByGameAndCardId');
const changeWildColorToRedByGameAndCardId = require('./changeWildColorToRedByGameAndCardId');
const changeWildColorToYellowByGameAndCardId = require('./changeWildColorToYellowByGameAndCardId');

const decrementNumberOfCardsById = require('../usersGames/decrementNumberOfCardsById');

const playCard = (gameId, cardId, userId, wildColor = '') => {
  return findTopCardByGameId(gameId)
    .then(topCard => {
      return Promise.all([
        changeOnTop(false, gameId, topCard.card_id),
        changeWildColorToNull(gameId, topCard.card_id),

        changeInDeck(false, gameId, cardId),
        changeInHand(false, gameId, cardId),
        changeOnTop(true, gameId, cardId),
        changeUserIdToNull(gameId, cardId),

        decrementNumberOfCardsById(userId, gameId)
      ]).then(() => {
        if (wildColor !== '') {
          switch (wildColor) {
            case 'blue':
              return changeWildColorToBlueByGameAndCardId(gameId, cardId).then(
                () => {
                  return findTopCardByGameId(gameId);
                }
              );
              break;

            case 'green':
              return changeWildColorToGreenByGameAndCardId(gameId, cardId).then(
                () => {
                  return findTopCardByGameId(gameId);
                }
              );
              break;

            case 'red':
              return changeWildColorToRedByGameAndCardId(gameId, cardId).then(
                () => {
                  return findTopCardByGameId(gameId);
                }
              );
              break;

            case 'yellow':
              return changeWildColorToYellowByGameAndCardId(
                gameId,
                cardId
              ).then(() => {
                return findTopCardByGameId(gameId);
              });
              break;

            default:
              break;
          }
        } else {
          return findTopCardByGameId(gameId);
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = playCard;

const database = require('../connection');

const findTopCardByGameId = require('./findTopCardByGameId')
  .findTopCardByGameId;
const changeWildColorToNull = require('./changeWildColorToNull')
  .changeWildColorToNull;
const changeUserIdToNull = require('./changeUserIdToNull').changeUserIdToNull;
const changeInDeck = require('./changeInDeck').changeInDeck;
const changeInHand = require('./changeInHand').changeInHand;
const changeOnTop = require('./changeOnTop').changeOnTop;
const decrementNumberOfCardsById = require('../usersGames/decrementNumberOfCardsById')
  .decrementNumberOfCardsById;

const changeWildColorToBlueByGameAndCardId = require('./changeWildColorToBlueByGameAndCardId')
  .changeWildColorToBlueById;
const changeWildColorToGreenByGameAndCardId = require('./changeWildColorToGreenByGameAndCardId')
  .changeWildColorToGreenById;
const changeWildColorToRedByGameAndCardId = require('./changeWildColorToRedByGameAndCardId')
  .changeWildColorToRedById;
const changeWildColorToYellowByGameAndCardId = require('./changeWildColorToYellowByGameAndCardId')
  .changeWildColorToYellowById;

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

module.exports = {
  playCard
};

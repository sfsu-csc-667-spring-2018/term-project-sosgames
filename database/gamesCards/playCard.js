const database = require('../connection');

const findTopCardByGameId = require('./findTopCardByGameId')
  .findTopCardByGameId;
const changeUserIdToNull = require('./changeUserIdToNull').changeUserIdToNull;
const changeInDeck = require('./changeInDeck').changeInDeck;
const changeInHand = require('./changeInHand').changeInHand;
const changeOnTop = require('./changeOnTop').changeOnTop;
const decrementNumberOfCardsById = require('../usersGames/decrementNumberOfCardsById')
  .decrementNumberOfCardsById;

const playCard = (gameId, cardId, userId) => {
  return findTopCardByGameId(gameId)
    .then(topCard => {
      return Promise.all([
        changeOnTop(false, gameId, topCard.card_id),

        changeInDeck(false, gameId, cardId),
        changeInHand(false, gameId, cardId),
        changeOnTop(true, gameId, cardId),
        changeUserIdToNull(gameId, cardId),

        decrementNumberOfCardsById(userId, gameId)
      ]).then(() => {
        return findTopCardByGameId(gameId);
      });
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = {
  playCard
};

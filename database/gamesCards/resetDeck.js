const database = require('../connection');

const findAllDiscardedCardsById = require('./findAllDiscardedCardsByGameId')
  .findAllDiscardedCardsById;
const changeUserIdToNull = require('./changeUserIdToNull').changeUserIdToNull;
const changeInDeck = require('./changeInDeck').changeInDeck;
const changeInHand = require('./changeInHand').changeInHand;
const changeOnTop = require('./changeOnTop').changeOnTop;
const changeWildColorToNull = require('./changeWildColorToNull')
  .changeWildColorToNull;

const resetDeck = gameId => {
  return findAllDiscardedCardsById(gameId).then(cards => {
    return database.task(dbTask => {
      let queries = [];

      cards.forEach(card => {
        queries.push(
          Promise.all([
            changeInDeck(true, gameId, card.card_id),
            changeInHand(false, gameId, card.card_id),
            changeOnTop(false, gameId, card.card_id),
            changeUserIdToNull(gameId, card.card_id),
            changeWildColorToNull(gameId, card.card_id)
          ])
        );
      });

      return dbTask.batch(queries);
    });
  });
};

module.exports = {
  resetDeck
};

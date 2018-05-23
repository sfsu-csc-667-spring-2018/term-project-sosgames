const database = require('../connection');

const findAllCardsInGame = require('./findAllCardsInGame');
const changeUserIdToNull = require('./changeUserIdToNull');
const changeInDeck = require('./changeInDeck');
const changeInHand = require('./changeInHand');
const changeOnTop = require('./changeOnTop');
const changeWildColorToNull = require('./changeWildColorToNull');

const resetAllCardsById = gameId => {
  return findAllCardsInGame(gameId).then(cards => {
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

module.exports = resetAllCardsById;

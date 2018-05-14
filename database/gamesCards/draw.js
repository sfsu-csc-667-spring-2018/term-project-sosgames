const database = require('../connection');
const getCardInDeck = require('./getCardInDeck').getCardInDeck;
const changeInDeck = require('./changeInDeck').changeInDeck;
const changeInHand = require('./changeInHand').changeInHand;
const changeOnTop = require('./changeOnTop').changeOnTop;
const changeUserId = require('./changeUserId').changeUserId;
const findCardById = require('./findCardById').findCardById;

const draw = (gameId, userId, numberOfCardsToDraw = 1) => {
  return getCardInDeck(gameId, numberOfCardsToDraw).then(cards => {
    return database.task(databaseTask => {
      let queries = [];
      cards.forEach(card => {
        queries.push(
          Promise.all([
            changeInDeck(false, gameId, card.card_id),
            changeInHand(true, gameId, card.card_id),
            changeOnTop(false, gameId, card.card_id),
            changeUserId(userId, gameId, card.card_id)
          ]).then(() => {
            return findCardById(card.card_id, gameId);
          })
        );
        // console.log(card.card_id + ' current card');
      });

      // for (card in cards) {
      //   queries.push(
      //     Promise.all([
      //       changeInDeck(false, gameId, cards[card].card_id),
      //       changeInHand(true, gameId, cards[card].card_id),
      //       changeOnTop(false, gameId, cards[card].card_id),
      //       changeUserId(userId, gameId, cards[card].card_id)
      //     ]).then(() => {
      //       return findCardById(cards[card].card_id, gameId);
      //     })
      //   );
      //   console.log(cards[card].card_id + ' current card');
      // }
      return databaseTask.batch(queries);
    });
  });
};

module.exports = {
  draw
};

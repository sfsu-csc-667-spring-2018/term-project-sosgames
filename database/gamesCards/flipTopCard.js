const database = require('../connection');
// const getNumberCardInDeck = require('./getNumberCardInDeck').getNumberCardInDeck;
const changeInDeck = require('./changeInDeck').changeInDeck;
const changeInHand = require('./changeInHand').changeInHand;
const changeOnTop = require('./changeOnTop').changeOnTop;
const findCardById = require('./findCardById').findCardById;
const changeUserId = require('./changeUserId').changeUserId;
const getNumberCardInDeck = require('./getNumberCardInDeck')
  .getNumberCardInDeck;

const flipTopCard = gameId => {
  return getNumberCardInDeck(gameId).then(card => {
    return Promise.all([
      changeInDeck(false, gameId, card.card_id),
      changeInHand(false, gameId, card.card_id),
      changeOnTop(true, gameId, card.card_id),
      changeUserId(null, gameId, card.card_id)
    ]).then(() => {
      return findCardById(card.card_id, gameId);
    });
  });
};

module.exports = {
  flipTopCard
};

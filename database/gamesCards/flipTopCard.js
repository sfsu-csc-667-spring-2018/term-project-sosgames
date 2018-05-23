const database = require('../connection');

const changeInDeck = require('./changeInDeck');
const changeInHand = require('./changeInHand');
const changeOnTop = require('./changeOnTop');
const findCardById = require('./findCardById');
const changeUserId = require('./changeUserId');
const getNumberCardInDeck = require('./getNumberCardInDeck');

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

module.exports = flipTopCard;

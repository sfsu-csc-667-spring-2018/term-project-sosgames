const database = require('../connection');
const getCardInDeck = require('./getCardInDeck').getCardInDeck;
const changeInDeck = require('./changeInDeck').changeInDeck;
const changeInHand = require('./changeInHand').changeInHand;
const changeOnTop = require('./changeOnTop').changeOnTop;
const changeUserId = require('./changeUserId').changeUserId;

const draw = (gameId, userId) => {
  getCardInDeck(gameId).then(card => {
    console.log(card);
    Promise.all([
      changeInDeck(false, gameId, card.card_id),
      changeInHand(true, gameId, card.card_id),
      changeOnTop(false, gameId, card.card_id),
      changeUserId(userId, gameId, card.card_id)
    ])

      .then(() => {
        console.log('works');
      })
      .catch(error => {
        console.log("doesn't word");
      });
  });
};

module.exports = {
  draw
};

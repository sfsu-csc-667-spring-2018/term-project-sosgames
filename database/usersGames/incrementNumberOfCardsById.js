const database = require('../connection');

const findNumberOfCardsById = require('./findNumberOfCardsById')
  .findNumberOfCardsById;
const changeNumberOfCardsById = require('./changeNumberOfCardsById')
  .changeNumberOfCardsById;

const incrementNumberOfCardsById = (userId, gameId) => {
  return findNumberOfCardsById(userId, gameId).then(game => {
    return changeNumberOfCardsById(userId, gameId, game.number_of_cards + 1);
  });
};

module.exports = {
  incrementNumberOfCardsById
};

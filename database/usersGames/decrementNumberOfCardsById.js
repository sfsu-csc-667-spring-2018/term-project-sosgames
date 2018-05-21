const database = require('../connection');

const findNumberOfCardsById = require('./findNumberOfCardsById')
  .findNumberOfCardsById;
const changeNumberOfCardsById = require('./changeNumberOfCardsById')
  .changeNumberOfCardsById;

const decrementNumberOfCardsById = (
  userId,
  gameId,
  numberOfCardsToDecrement = 1
) => {
  return findNumberOfCardsById(userId, gameId).then(game => {
    return changeNumberOfCardsById(
      userId,
      gameId,
      game.number_of_cards - numberOfCardsToDecrement
    );
  });
};

module.exports = {
  decrementNumberOfCardsById
};

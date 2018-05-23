const database = require('../connection');

const findNumberOfCardsById = require('./findNumberOfCardsById');
const changeNumberOfCardsById = require('./changeNumberOfCardsById');

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

module.exports = decrementNumberOfCardsById;

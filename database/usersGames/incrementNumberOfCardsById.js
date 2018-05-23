const database = require('../connection');

const findNumberOfCardsById = require('./findNumberOfCardsById');
const changeNumberOfCardsById = require('./changeNumberOfCardsById');

const incrementNumberOfCardsById = (
  userId,
  gameId,
  numberOfCardsToIncrement = 1
) => {
  return findNumberOfCardsById(userId, gameId).then(game => {
    return changeNumberOfCardsById(
      userId,
      gameId,
      game.number_of_cards + numberOfCardsToIncrement
    );
  });
};

module.exports = incrementNumberOfCardsById;

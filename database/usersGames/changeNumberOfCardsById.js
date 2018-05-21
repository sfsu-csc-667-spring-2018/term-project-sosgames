const database = require('../connection');

const UPDATE_NUMBER_OF_CARDS_QUERY = `UPDATE users_games SET number_of_cards = $1 WHERE user_id = $2 AND game_id = $3`;

const changeNumberOfCardsById = (userId, gameId, newNumberOfCards) => {
  return database.none(UPDATE_NUMBER_OF_CARDS_QUERY, [
    newNumberOfCards,
    userId,
    gameId
  ]);
};

module.exports = {
  changeNumberOfCardsById
};

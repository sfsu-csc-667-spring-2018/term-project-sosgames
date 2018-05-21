const database = require('../connection');

const FIND_NUMBER_OF_CARDS_BY_ID_QUERY = `SELECT number_of_cards FROM users_games WHERE user_id = $1 AND game_id = $2`;

const findNumberOfCardsById = (userId, gameId) =>
  database.one(FIND_NUMBER_OF_CARDS_BY_ID_QUERY, [userId, gameId]);

module.exports = {
  findNumberOfCardsById
};

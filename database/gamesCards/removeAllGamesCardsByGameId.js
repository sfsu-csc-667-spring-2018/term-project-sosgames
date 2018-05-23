const database = require('../connection');

const REMOVE_ALL_GAME_CARD_QUERY = `DELETE FROM games_cards WHERE game_id = $1`;

const removeAllById = gameId => {
  return database.none(REMOVE_ALL_GAME_CARD_QUERY, [gameId]);
};

module.exports = removeAllById;

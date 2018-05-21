const database = require('../connection');

const FIND_CURRENT_PLAYER_INDEX_QUERY = `SELECT current_player_index FROM games WHERE id = $1`;

const findCurrentPlayerIndexById = gameId => {
  return database.one(FIND_CURRENT_PLAYER_INDEX_QUERY, [gameId]);
};

module.exports = {
  findCurrentPlayerIndexById
};

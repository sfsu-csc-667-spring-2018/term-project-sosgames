const database = require('../connection');

const FIND_GAME_BY_ID_QUERY = `SELECT * FROM games WHERE id = $1`;

const findById = gameId => {
  return database.oneOrNone(FIND_GAME_BY_ID_QUERY, [gameId]);
};

module.exports = {
  findById
};

const database = require('../connection');

const FIND_IS_REVERSED_QUERY = `SELECT is_reversed FROM games WHERE id = $1`;

const findIsReversedById = gameId => {
  return database.one(FIND_IS_REVERSED_QUERY, [gameId]);
};

module.exports = {
  findIsReversedById
};

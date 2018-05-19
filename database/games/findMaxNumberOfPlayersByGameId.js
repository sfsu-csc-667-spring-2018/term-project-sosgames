const database = require('../connection');

const FIND_MAX_NUMBER_OF_PLAYERS_QUERY = `SELECT max_number_of_players FROM games WHERE id = $1`;

const findMaxNumberOfPlayersById = gameId => {
  return database.one(FIND_MAX_NUMBER_OF_PLAYERS_QUERY, [gameId]);
};

module.exports = {
  findMaxNumberOfPlayersById
};

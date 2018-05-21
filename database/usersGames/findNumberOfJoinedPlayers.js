const database = require('../connection');

const FIND_CURRENT_NUMBER_OF_PLAYERS_JOINED_QUERY = `SELECT count(*) FROM users_games WHERE game_id = $1`;

const findNumberOfJoinedPlayers = gameId => {
  return database.one(FIND_CURRENT_NUMBER_OF_PLAYERS_JOINED_QUERY, [gameId]);
};

module.exports = {
  findNumberOfJoinedPlayers
};

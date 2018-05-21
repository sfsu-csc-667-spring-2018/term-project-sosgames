const database = require('../connection');

const IS_STARTED = `SELECT current_player_index FROM games WHERE id=$1`;

const isStarted = gameId => {
  return database.one(IS_STARTED, [gameId]);
};

module.exports = isStarted;

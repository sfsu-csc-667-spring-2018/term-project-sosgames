const database = require('../connection');
const findGameById = require('./findGameById');

const CURRENT_PLAYERS_COUNT_IN_GAME =
  'SELECT COUNT(*) FROM users_games WHERE users_games.game_id=$1';

const MAX_PLAYERS_COUNT_IN_GAME =
  'SELECT max_number_of_players FROM games WHERE id=$1';

const isValidToStart = gameId => {
  return Promise.all([
    database.oneOrNone(CURRENT_PLAYERS_COUNT_IN_GAME, [gameId]),
    database.oneOrNone(MAX_PLAYERS_COUNT_IN_GAME, [gameId])
  ]).then(([currentPlayerCount, maxPlayerCount]) => {
    let currentCount = +currentPlayerCount.count;
    let maxCount = maxPlayerCount.max_number_of_players;

    if (currentCount >= 2 && currentCount <= maxCount) {
      return findGameById(gameId);
    } else {
      throw 'Waiting for more players to start game.';
    }
  });
};

module.exports = isValidToStart;

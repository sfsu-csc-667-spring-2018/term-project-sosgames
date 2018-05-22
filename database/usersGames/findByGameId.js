const database = require('../connection');

const FIND_USER_GAME_BY_GAME_ID_QUERY = `SELECT * FROM users_games INNER JOIN users ON users.id = users_games.user_id WHERE users_games.game_id = $1 ORDER BY user_id ASC`;

const findByGameId = gameId =>
  database.many(FIND_USER_GAME_BY_GAME_ID_QUERY, [gameId]);

module.exports = {
  findByGameId
};

const database = require('../connection');

const FIND_USER_GAME_BY_USER_ID_QUERY = `SELECT * FROM users_games INNER JOIN users ON users.id = users_games.user_id WHERE users_games.user_id = $1`;

const findByUserId = userId =>
  database.many(FIND_USER_GAME_BY_USER_ID_QUERY, [userId]);

module.exports = {
  findByUserId
};

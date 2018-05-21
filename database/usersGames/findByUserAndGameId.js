const database = require('../connection');

const FIND_USER_GAME_BY_USER_AND_GAME_ID_QUERY = `SELECT * FROM users_games INNER JOIN users ON users.id = users_games.user_id WHERE users_games.user_id = $1 AND game_id = $2`;

const findByUserAndGameId = (userId, gameId) =>
  database.one(FIND_USER_GAME_BY_USER_AND_GAME_ID_QUERY, [userId, gameId]);

module.exports = {
  findByUserAndGameId
};

const database = require('../connection');

const FIND_USER_BY_USER_ID_AND_GAME_ID_QUERY = `SELECT * FROM users_games WHERE user_id = $1 AND game_id = $2`;

const findUserByUserIdAndGameId = (userId, gameId) =>
  database.one(FIND_USER_BY_USER_ID_AND_GAME_ID_QUERY, [userId, gameId]);

module.exports = {
  findUserByUserIdAndGameId
};

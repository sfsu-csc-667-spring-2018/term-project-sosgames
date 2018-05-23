const database = require('../connection');

const FIND_CURRENT_SCORE_BY_ID_QUERY = `SELECT current_score FROM users_games WHERE user_id = $1 AND game_id = $2`;

const findCurrentScoreById = (userId, gameId) =>
  database.one(FIND_CURRENT_SCORE_BY_ID_QUERY, [userId, gameId]);

module.exports = findCurrentScoreById;

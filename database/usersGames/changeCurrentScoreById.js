const database = require('../connection');

const UPDATE_CURRENT_SCORE_QUERY = `UPDATE users_games SET current_score = $1 WHERE user_id = $2 AND game_id = $3`;

const changeCurrentScoreById = (userId, gameId, newCurrentScore) => {
  return database.none(UPDATE_CURRENT_SCORE_QUERY, [
    newCurrentScore,
    userId,
    gameId
  ]);
};

module.exports = changeCurrentScoreById;

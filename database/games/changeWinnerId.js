const database = require('../connection');

const UPDATE_WINNER_ID_QUERY = `UPDATE games SET winner_id = $1 WHERE id = $2`;

const changeWinnerId = (gameId, winnerId) => {
  return database.none(UPDATE_WINNER_ID_QUERY, [winnerId, gameId]);
};

module.exports = changeWinnerId;

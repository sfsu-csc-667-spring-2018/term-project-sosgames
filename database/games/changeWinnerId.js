const database = require('../connection');

const UPDATE_WINNER_ID_QUERY = `UPDATE games SET winner_id = $1 WHERE id = $2`;

const changeWinnerId = (gameId, winner_id) => {
  return database.none(UPDATE_WINNER_ID_QUERY, [winner_id, gameId]);
};

module.exports = {
  changeWinnerId
};

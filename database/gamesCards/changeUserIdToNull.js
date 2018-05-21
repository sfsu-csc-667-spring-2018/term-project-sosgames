const database = require('../connection');

const UPDATE_USER_ID_QUERY = `UPDATE games_cards SET user_id = null WHERE game_id = $1 AND card_id = $2`;

const changeUserIdToNull = (gameId, cardId) => {
  return database.none(UPDATE_USER_ID_QUERY, [gameId, cardId]);
};

module.exports = {
  changeUserIdToNull
};

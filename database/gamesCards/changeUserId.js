const database = require('../connection');

const UPDATE_USER_ID_QUERY = `UPDATE games_cards SET user_id = $1 WHERE game_id = $2 AND card_id = $3`;

const changeUserId = (userId, gameId, cardId) => {
  return database.none(UPDATE_USER_ID_QUERY, [userId, gameId, cardId]);
};

module.exports = {
  changeUserId
};

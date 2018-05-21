const database = require('../connection');

const UPDATE_USER_ID_QUERY = `UPDATE games_cards SET wild_color = null WHERE game_id = $1 AND card_id = $2`;

const changeWildColorToNull = (gameId, cardId) => {
  return database.none(UPDATE_USER_ID_QUERY, [gameId, cardId]);
};

module.exports = {
  changeWildColorToNull
};

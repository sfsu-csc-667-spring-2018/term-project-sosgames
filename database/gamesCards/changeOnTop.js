const database = require('../connection');

const UPDATE_ON_TOP_QUERY = `UPDATE games_cards SET on_top = $1 WHERE game_id = $2 AND card_id = $3`;

const changeOnTop = (onTop, gameId, cardId) => {
  return database.none(UPDATE_ON_TOP_QUERY, [onTop, gameId, cardId]);
};

module.exports = changeOnTop;

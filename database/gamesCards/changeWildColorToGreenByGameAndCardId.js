const database = require('../connection');

const UPDATE_WILD_COLOR_QUERY = `UPDATE games_cards SET wild_color = $1 WHERE game_id = $2 AND card_id = $3`;

const changeWildColorToGreenById = (gameId, cardId) => {
  return database.none(UPDATE_WILD_COLOR_QUERY, ['green', gameId, cardId]);
};

module.exports = {
  changeWildColorToGreenById
};

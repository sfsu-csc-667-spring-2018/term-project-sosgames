const database = require('../connection');

const FIND_TOP_CARD_BY_GAME_ID_QUERY = `SELECT * FROM games_cards INNER JOIN cards ON cards.id = games_cards.card_id WHERE games_cards.game_id = $1 AND on_top = true`;

const findTopCardByGameId = gameId => {
  return database.one(FIND_TOP_CARD_BY_GAME_ID_QUERY, [gameId]);
};

module.exports = findTopCardByGameId;

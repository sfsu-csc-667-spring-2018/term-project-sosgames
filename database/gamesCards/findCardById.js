const database = require('../connection');

const FIND_CARD_BY_ID_QUERY = `SELECT * FROM games_cards INNER JOIN cards ON cards.id = games_cards.card_id WHERE games_cards.game_id = $1 AND card_id = $2`;

const findCardById = (cardId, gameId) => {
  return database.one(FIND_CARD_BY_ID_QUERY, [gameId, cardId]);
};

module.exports = {
  findCardById
};

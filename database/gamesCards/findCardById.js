const database = require('../connection');

const findCardById = (cardId, gameId) => {
  const FIND_CARD_BY_ID_QUERY = `SELECT * FROM games_cards INNER JOIN cards ON cards.id = games_cards.card_id WHERE games_cards.game_id = $1 AND card_id = ${cardId}`;
  return database.one(FIND_CARD_BY_ID_QUERY, [gameId]);
};

module.exports = {
  findCardById
};

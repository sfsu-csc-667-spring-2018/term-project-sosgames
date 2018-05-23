const database = require('../connection');

const FIND_ALL_DISCARDED_CARDS_IN_GAME_QUERY = `SELECT * FROM games_cards INNER JOIN cards ON cards.id = games_cards.card_id WHERE games_cards.game_id = $1 AND in_hand = false AND in_deck = false AND on_top = false`;

const findAllDiscardedCardsById = gameId => {
  return database.many(FIND_ALL_DISCARDED_CARDS_IN_GAME_QUERY, [gameId]);
};

module.exports = findAllDiscardedCardsById;

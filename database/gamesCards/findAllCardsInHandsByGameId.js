const database = require('../connection');

const FIND_ALL_CARDS_IN_HAND_QUERY = `SELECT * FROM games_cards INNER JOIN cards ON cards.id = games_cards.card_id WHERE games_cards.game_id = $1 AND in_hand = true`;

const findAllCardsInHandById = gameId => {
  return database.many(FIND_ALL_CARDS_IN_HAND_QUERY, [gameId]);
};

module.exports = {
  findAllCardsInHandById
};

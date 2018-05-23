const database = require('../connection');

const GET_NUMBER_CARD_IN_DECK_QUERY = `SELECT * FROM games_cards INNER JOIN cards ON cards.id = games_cards.card_id WHERE game_id = $1 AND in_deck = true AND point_value < 20 ORDER BY random() LIMIT 1`;

const getNumberCardInDeck = gameId => {
  return database.one(GET_NUMBER_CARD_IN_DECK_QUERY, [gameId]);
};

module.exports = getNumberCardInDeck;

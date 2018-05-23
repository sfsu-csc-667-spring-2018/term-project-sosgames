const database = require('../connection');

const getCardInDeck = (gameId, numberOfCardsToDraw = 1) => {
  const GET_CARD_IN_DECK_QUERY = `SELECT * FROM games_cards INNER JOIN cards ON cards.id = games_cards.card_id WHERE game_id = $1 AND in_deck = true ORDER BY random() LIMIT ${numberOfCardsToDraw}`;
  return database.many(GET_CARD_IN_DECK_QUERY, [gameId]);
};

module.exports = getCardInDeck;

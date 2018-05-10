const database = require('../connection');

const GET_CARD_IN_DECK_QUERY = `SELECT * from games_cards WHERE game_id = $1 AND in_deck = true LIMIT 1`;

const getCardInDeck = gameId => {
  return database.one(GET_CARD_IN_DECK_QUERY, [gameId]);
};

module.exports = {
  getCardInDeck
};

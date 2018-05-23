const database = require('../connection');

const UPDATE_IN_DECK_QUERY = `UPDATE games_cards SET in_deck = $1 WHERE game_id = $2 AND card_id = $3`;

const changeInDeck = (inDeck, gameId, cardId) => {
  return database.none(UPDATE_IN_DECK_QUERY, [inDeck, gameId, cardId]);
};

module.exports = changeInDeck;

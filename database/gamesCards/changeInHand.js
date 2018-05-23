const database = require('../connection');

const UPDATE_IN_HAND_QUERY = `UPDATE games_cards SET in_hand = $1 WHERE game_id = $2 AND card_id = $3`;

const changeInHand = (inHand, gameId, cardId) => {
  return database.none(UPDATE_IN_HAND_QUERY, [inHand, gameId, cardId]);
};

module.exports = changeInHand;

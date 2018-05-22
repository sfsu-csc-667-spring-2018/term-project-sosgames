const database = require('../connection');

const FIND_ALL_PLAYABLE_CARDS_IN_GAME_QUERY = `SELECT * FROM games_cards INNER JOIN cards ON cards.id = games_cards.card_id WHERE games_cards.game_id = $1 AND games_cards.user_id = $2 AND in_hand = true AND (cards.value = $3 OR cards.color = $4 OR cards.point_value = 50)`;

const findAllPlayableCardsById = (gameId, userId, cardValue, cardColor) => {
  return database.any(FIND_ALL_PLAYABLE_CARDS_IN_GAME_QUERY, [
    gameId,
    userId,
    cardValue,
    cardColor
  ]);
};

module.exports = findAllPlayableCardsById;

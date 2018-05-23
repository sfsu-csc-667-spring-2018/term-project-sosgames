const database = require('../connection');

const FIND_ALL_CARDS_IN_GAME_QUERY = `SELECT * FROM games_cards INNER JOIN cards ON cards.id = games_cards.card_id WHERE games_cards.game_id = $1`;

const findAllCardsInGame = gameId => {
  return database.many(FIND_ALL_CARDS_IN_GAME_QUERY, [gameId]);
};

module.exports = findAllCardsInGame;

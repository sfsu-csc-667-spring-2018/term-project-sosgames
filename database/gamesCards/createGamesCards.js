const database = require('../connection');

const getAllCards = require('../cards/getAllCards');

const CREATE_GAME_CARD_QUERY = `INSERT INTO games_cards (game_id, card_id) VALUES ($1, $2)`;

const create = gameId => {
  return getAllCards()
    .then(cards => {
      return database.task(dbTask => {
        let queries = [];
        cards.forEach(card => {
          queries.push(dbTask.none(CREATE_GAME_CARD_QUERY, [gameId, card.id]));
        });
        return dbTask.batch(queries);
      });
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = create;

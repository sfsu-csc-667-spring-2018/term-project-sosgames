const database = require('../connection');

const CREATE_GAME_QUERY = `INSERT INTO games (name, number_of_players) VALUES ($1, $2) RETURNING id`;

const create = (gameName, numberOfPlayers) => {
  return database.one(CREATE_GAME_QUERY, [gameName, numberOfPlayers]);
};

module.exports = {
  create
};

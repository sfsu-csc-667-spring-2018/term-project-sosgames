const database = require('../connection');
// CHANGE HERE TO RETURN ALL
const CREATE_GAME_QUERY = `INSERT INTO games (name, max_number_of_players) VALUES ($1, $2) RETURNING *`;

const create = (gameName, maxNumberOfPlayers) => {
  return database.one(CREATE_GAME_QUERY, [gameName, maxNumberOfPlayers]);
};

module.exports = {
  create
};

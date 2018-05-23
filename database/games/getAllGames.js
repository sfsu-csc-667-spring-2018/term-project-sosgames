const database = require('../connection');

const GET_ALL_GAMES_QUERY = `SELECT * FROM games`;

const getAllGames = () => {
  return database.many(GET_ALL_GAMES_QUERY);
};

module.exports = getAllGames;

const database = require('../connection');

const FIND_NUMBER_OF_GAMES_QUERY = `SELECT count(*) FROM games`;

const findNumberOfGames = () => {
  return database.one(FIND_NUMBER_OF_GAMES_QUERY);
};

module.exports = findNumberOfGames;

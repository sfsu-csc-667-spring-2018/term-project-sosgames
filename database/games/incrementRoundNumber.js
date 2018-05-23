const database = require('../connection');

const findById = require('./findGameById');

const UPDATE_ROUND_NUMBER_QUERY = `UPDATE games SET round_number = $1 WHERE id = $2`;

const incrementRoundNumber = gameId => {
  return findById(gameId)
    .then(gameData => {
      return database.none(UPDATE_ROUND_NUMBER_QUERY, [
        gameData.round_number + 1,
        gameId
      ]);
    })
    .catch(error => {});
};

module.exports = incrementRoundNumber;

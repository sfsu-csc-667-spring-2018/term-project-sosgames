const database = require('../connection');
const findById = require('./findGameById');

const UPDATE_IS_REVERSED_QUERY = `UPDATE games SET is_reversed = $1 WHERE id = $2 RETURNING is_reversed`;

const changeGameDirection = gameId => {
  return findById(gameId)
    .then(gameData => {
      return database.one(UPDATE_IS_REVERSED_QUERY, [
        !gameData.is_reversed,
        gameId
      ]);
    })
    .catch(error => {
      console.log('Game ID invalid');
    });
};

module.exports = changeGameDirection;

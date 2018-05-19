const database = require('../connection');
const findById = require('./findGameById').findById;

const ADD_CURRENT_PLAYER_INDEX_QUERY = `UPDATE games SET current_player_index = $1 WHERE id = $2 RETURNING current_player_index`;

const addCurrentPlayerIndex = (gameId, numberToAddToIndex) => {
  return findById(gameId)
    .then(gameData => {
      return database.one(ADD_CURRENT_PLAYER_INDEX_QUERY, [
        gameData.current_player_index + numberToAddToIndex,
        gameId
      ]);
    })
    .catch(error => {
      console.log('Cannot add to index');
    });
};

module.exports = {
  addCurrentPlayerIndex
};

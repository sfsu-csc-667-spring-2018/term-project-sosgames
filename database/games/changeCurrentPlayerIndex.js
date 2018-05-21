const database = require('../connection');

const UPDATE_CURRENT_PLAYER_INDEX_QUERY = `UPDATE games SET current_player_index = $1 WHERE id = $2 RETURNING current_player_index`;

const changeCurrentPlayerIndex = (newPlayerIndex, gameId) => {
  console.log(newPlayerIndex);
  console.log(gameId);
  console.log('dudeee');

  return database.one(UPDATE_CURRENT_PLAYER_INDEX_QUERY, [
    newPlayerIndex,
    gameId
  ]);
};

module.exports = changeCurrentPlayerIndex;

const database = require('../connection');
const findById = require('./findGameById').findById;

const UPDATE_IS_REVERSED_QUERY = `UPDATE games SET is_reversed = $1 WHERE id = $2`;

const changeGameDirection = (gameId) => {
  findById(gameId)
    .then(
      (gameData) => {
        return database.none(UPDATE_IS_REVERSED_QUERY, [!gameData.is_reversed, gameId] )
      }
    )
    .catch(
      (error) => {
        console.log("Game ID invalid") 
      }
    )
};

module.exports={
  changeGameDirection
}
const database = require('../connection');

const getNextPlayerIndex = require('./getNextPlayerIndex');
const changeCurrentPlayerIndex = require('./changeCurrentPlayerIndex');

const nextPlayerTurn = (gameId, isSpecialCase = false) => {
  return getNextPlayerIndex(gameId, isSpecialCase)
    .then(nextPlayerIndex => {
      return changeCurrentPlayerIndex(nextPlayerIndex, gameId);
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = nextPlayerTurn;

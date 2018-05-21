const database = require('../connection');

const getNextPlayerIndex = require('./getNextPlayerIndex');
const changeCurrentPlayerIndex = require('./changeCurrentPlayerIndex');

const nextPlayerTurn = gameId => {
  return getNextPlayerIndex(gameId)
    .then(nextPlayerIndex => {
      return changeCurrentPlayerIndex(nextPlayerIndex, gameId);
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = {
  nextPlayerTurn
};

const database = require('../connection');

const sumAllCardsPointValuesInHands = require('../gamesCards/sumAllCardsPointValuesInHands');
const addCurrentScoreById = require('./addCurrentScoreById');

const incrementWinnerCurrentScoreById = (userId, gameId) => {
  return sumAllCardsPointValuesInHands(gameId)
    .then(cardsTotalPointValues => {
      return addCurrentScoreById(userId, gameId, cardsTotalPointValues);
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = incrementWinnerCurrentScoreById;

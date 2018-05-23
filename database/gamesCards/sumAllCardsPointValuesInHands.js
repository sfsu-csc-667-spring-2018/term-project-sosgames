const database = require('../connection');

const findAllCardsInHandById = require('./findAllCardsInHandsByGameId');

const sumAllCardsPointValuesInHands = gameId => {
  return findAllCardsInHandById(gameId).then(cards => {
    let totalSumOfCardsPointValue = 0;

    cards.forEach(card => {
      totalSumOfCardsPointValue += card.point_value;
    });
    return totalSumOfCardsPointValue;
  });
};

module.exports = sumAllCardsPointValuesInHands;

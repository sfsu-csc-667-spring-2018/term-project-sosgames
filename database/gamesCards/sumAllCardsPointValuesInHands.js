const database = require('../connection');

const findAllCardsInHandById = require('./findAllCardsInHandsByGameId')
  .findAllCardsInHandById;

const sumAllCardsPointValuesInHands = gameId => {
  findAllCardsInHandById(gameId).then(cards => {
    let totalSumOfCardsPointValue = 0;

    cards.forEach(card => {
      totalSumOfCardsPointValue += card.point_value;
    });
    return totalSumOfCardsPointValue;
  });
};

module.exports = {
  sumAllCardsPointValuesInHands
};

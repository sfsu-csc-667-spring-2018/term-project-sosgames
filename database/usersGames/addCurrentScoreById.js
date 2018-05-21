const database = require('../connection');

const findCurrentScoreById = require('./findCurrentScoreById')
  .findCurrentScoreById;
const changeCurrentScoreById = require('./changeCurrentScoreById')
  .changeCurrentScoreById;

const addCurrentScoreById = (userId, gameId, scoreToBeAdded) => {
  findCurrentScoreById(userId, gameId).then(usersGames => {
    changeCurrentScoreById(
      userId,
      gameId,
      usersGames.current_score + scoreToBeAdded
    );
  });
};

module.exports = {
  addCurrentScoreById
};

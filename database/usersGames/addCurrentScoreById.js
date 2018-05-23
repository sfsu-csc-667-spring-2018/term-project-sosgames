const database = require('../connection');

const findCurrentScoreById = require('./findCurrentScoreById');
const changeCurrentScoreById = require('./changeCurrentScoreById');

const addCurrentScoreById = (userId, gameId, scoreToBeAdded) => {
  return findCurrentScoreById(userId, gameId).then(usersGames => {
    return changeCurrentScoreById(
      userId,
      gameId,
      usersGames.current_score + scoreToBeAdded
    );
  });
};

module.exports = addCurrentScoreById;

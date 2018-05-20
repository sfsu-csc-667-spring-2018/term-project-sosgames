const create = require('./createUsersGames').create;
const findByUserId = require('./findByUserId').findByUserId;
const findByGameId = require('./findByGameId').findByGameId;
const findByUserAndGameId = require('./findByUserAndGameId')
  .findByUserAndGameId;
const findNumberOfJoinedPlayers = require('./findNumberOfJoinedPlayers')
  .findNumberOfPlayersJoined;
const findCurrentScoreById = require('./findCurrentScoreById')
  .findCurrentScoreById;
const addCurrentScoreById = require('./addCurrentScoreById')
  .addCurrentScoreById;
const changeCurrentScoreById = require('./changeCurrentScoreById')
  .changeCurrentScoreById;

module.exports = {
  create,
  findByUserId,
  findByGameId,
  findByUserAndGameId,
  findNumberOfJoinedPlayers,
  findCurrentScoreById,
  addCurrentScoreById,
  changeCurrentScoreById
};

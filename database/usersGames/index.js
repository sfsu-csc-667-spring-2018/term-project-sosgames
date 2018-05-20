const create = require('./createUsersGames').create;
const findByUserId = require('./findByUserId').findByUserId;
const findByGameId = require('./findByGameId').findByGameId;
const findByUserAndGameId = require('./findByUserAndGameId')
  .findByUserAndGameId;
const findNumberOfJoinedPlayers = require('./findNumberOfJoinedPlayers')
  .findNumberOfPlayersJoined;

module.exports = {
  create,
  findByUserId,
  findByGameId,
  findByUserAndGameId,
  findNumberOfJoinedPlayers
};

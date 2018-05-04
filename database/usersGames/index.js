const create = require('./createUsersGames').create;
const findByUserId = require('./findUsersGamesByUserId').findByUserId;
const findByGameId = require('./findUserGamesByGameId').findByGameId;
const findByUserAndGameId = require('./findUserGamesByUserAndGameId').findByUserAndGameId;

module.exports = {
  create, 
  findByUserId,
  findByGameId,
  findByUserAndGameId
};
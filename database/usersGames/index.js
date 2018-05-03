const create = require('./createUsersGames').create;
const findByUserId = require('./findUsersGamesByUserId').findByUserId;
const findByGameId = require('./findUserGamesByGameId').findByGameId;

module.exports = {
  create, 
  findByUserId,
  findByGameId
};
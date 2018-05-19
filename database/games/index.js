const create = require('./createGame').create;
const findById = require('./findGameById').findById;
const incrementRoundNumber = require('./incrementRoundNumber')
  .incrementRoundNumber;
const changeGameDirection = require('./changeGameDirection')
  .changeGameDirection;
const changeWinnerId = require('./changeWinnerId').changeWinnerId;
const findNumberOfGames = require('./findNumberOfGames').findNumberOfGames;
const getAllGames = require('./getAllGames').getAllGames;
const addCurrentPlayerIndex = require('./addCurrentPlayerIndex')
  .addCurrentPlayerIndex;
const findCurrentPlayerIndexById = require('./findCurrentPlayerIndexByGameId')
  .findCurrentPlayerIndexById;
const findMaxNumberOfPlayersById = require('./findMaxNumberOfPlayersByGameId')
  .findMaxNumberOfPlayersById;

module.exports = {
  create,
  findById,
  incrementRoundNumber,
  changeGameDirection,
  changeWinnerId,
  findNumberOfGames,
  getAllGames,
  addCurrentPlayerIndex,
  findCurrentPlayerIndexById,
  findMaxNumberOfPlayersById
};

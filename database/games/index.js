const create = require('./createGame').create;
const findById = require('./findGameById').findById;
const incrementRoundNumber = require('./incrementRoundNumber')
  .incrementRoundNumber;
const changeGameDirection = require('./changeGameDirection')
  .changeGameDirection;
const changeWinnerId = require('./changeWinnerId').changeWinnerId;
const getAllGames = require('./getAllGames').getAllGames;

module.exports = {
  create,
  findById,
  incrementRoundNumber,
  changeGameDirection,
  changeWinnerId,
  getAllGames
};

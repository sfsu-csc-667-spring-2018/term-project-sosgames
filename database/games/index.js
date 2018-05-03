const create = require('./createGame').create;
const findById = require('./findGameById').findById;
const incrementRoundNumber = require('./incrementRoundNumber').incrementRoundNumber;

module.exports = {
  create, 
  findById,
  incrementRoundNumber
};
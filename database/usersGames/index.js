const create = require('./createUsersGames').create;
const findByUserId = require('./findByUserId').findByUserId;
const findByGameId = require('./findByGameId').findByGameId;
const findByUserAndGameId = require('./findByUserAndGameId')
  .findByUserAndGameId;
const findNumberOfJoinedPlayers = require('./findNumberOfJoinedPlayers')
  .findNumberOfJoinedPlayers;
const findCurrentScoreById = require('./findCurrentScoreById')
  .findCurrentScoreById;
const addCurrentScoreById = require('./addCurrentScoreById')
  .addCurrentScoreById;
const changeCurrentScoreById = require('./changeCurrentScoreById')
  .changeCurrentScoreById;
const findNumberOfCardsById = require('./findNumberOfCardsById')
  .findNumberOfCardsById;
const changeNumberOfCardsById = require('./changeNumberOfCardsById')
  .changeNumberOfCardsById;
const incrementNumberOfCardsById = require('./incrementNumberOfCardsById')
  .incrementNumberOfCardsById;
const decrementNumberOfCardsById = require('./decrementNumberOfCardsById')
  .decrementNumberOfCardsById;

module.exports = {
  create,
  findByUserId,
  findByGameId,
  findByUserAndGameId,
  findNumberOfJoinedPlayers,
  findCurrentScoreById,
  addCurrentScoreById,
  changeCurrentScoreById,
  findNumberOfCardsById,
  changeNumberOfCardsById,
  incrementNumberOfCardsById,
  decrementNumberOfCardsById
};

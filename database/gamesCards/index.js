const create = require('./createGamesCards').create;
const removeAllById = require('./removeAllGamesCardsByGameId').removeAllById;
const findAllCardsInGame = require('./findAllCardsInGame').findAllCardsInGame;

module.exports = {
  create,
  removeAllById,
  findAllCardsInGame
};

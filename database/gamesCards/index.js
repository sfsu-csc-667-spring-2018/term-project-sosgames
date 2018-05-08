const create = require('./createGamesCards').create;
const removeAllById = require('./removeAllGamesCardsByGameId').removeAllById;
const findAllCardsInGame = require('./findAllCardsInGame').findAllCardsInGame;
const changeInDeck = require('./changeInDeck').changeInDeck;
const changeInHand = require('./changeInHand').changeInHand;
const changeUserId = require('./changeUserId').changeUserId;
const changeOnTop = require('./changeOnTop').changeOnTop;

module.exports = {
  create,
  removeAllById,
  findAllCardsInGame,
  changeInDeck,
  changeInHand,
  changeUserId,
  changeOnTop
};

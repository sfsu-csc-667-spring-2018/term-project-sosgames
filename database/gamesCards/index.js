const create = require('./createGamesCards').create;
const removeAllById = require('./removeAllGamesCardsByGameId').removeAllById;
const findAllCardsInGame = require('./findAllCardsInGame').findAllCardsInGame;
const changeInDeck = require('./changeInDeck').changeInDeck;
const changeInHand = require('./changeInHand').changeInHand;
const changeUserId = require('./changeUserId').changeUserId;
const changeOnTop = require('./changeOnTop').changeOnTop;
const draw = require('./draw').draw;
const getCardInDeck = require('./getCardInDeck').getCardInDeck;
const findCardById = require('./findCardById').findCardById;
const getNumberCardInDeck = require('./getNumberCardInDeck')
  .getNumberCardInDeck;
const flipTopCard = require('./flipTopCard').flipTopCard;
const findTopCardByGameId = require('./findTopCardByGameId')
  .findTopCardByGameId;
const changeWildColorToRedById = require('./changeWildColorToRedByGameAndCardId')
  .changeWildColorToRedById;
const changeWildColorToBlueById = require('./changeWildColorToBlueByGameAndCardId')
  .changeWildColorToBlueById;
const changeWildColorToYellowById = require('./changeWildColorToYellowByGameAndCardId')
  .changeWildColorToYellowById;
const changeWildColorToGreenById = require('./changeWildColorToGreenByGameAndCardId')
  .changeWildColorToGreenById;

module.exports = {
  create,
  removeAllById,
  findAllCardsInGame,
  changeInDeck,
  changeInHand,
  changeUserId,
  changeOnTop,
  draw,
  getCardInDeck,
  findCardById,
  getNumberCardInDeck,
  flipTopCard,
  findTopCardByGameId,
  changeWildColorToRedById,
  changeWildColorToBlueById,
  changeWildColorToYellowById,
  changeWildColorToGreenById
};

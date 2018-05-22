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
const findAllDiscardedCardsById = require('./findAllDiscardedCardsByGameId')
  .findAllDiscardedCardsById;
const changeUserIdToNull = require('./changeUserIdToNull').changeUserIdToNull;
const changeWildColorToNull = require('./changeWildColorToNull')
  .changeWildColorToNull;
const resetDeck = require('./resetDeck').resetDeck;
const playCard = require('./playCard').playCard;
const findAllCardsInHandsById = require('./findAllCardsInHandsByGameId')
  .findAllCardsInHandById;
const sumAllCardsPointValuesInHands = require('./sumAllCardsPointValuesInHands')
  .sumAllCardsPointValuesInHands;

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
  dealCards: require('./dealCards'),
  changeWildColorToRedById,
  changeWildColorToBlueById,
  changeWildColorToYellowById,
  changeWildColorToGreenById,
  findAllDiscardedCardsById,
  changeUserIdToNull,
  changeWildColorToNull,
  resetDeck,
  playCard,
  findAllCardsInHandsById,
  sumAllCardsPointValuesInHands,
  findAllCardsInDeckById: require('./findAllCardsInDeckById'),
  findAllPlayableCardsById: require('./findAllPlayableCardsByGameAndUserId'),
  playCardOrDraw: require('./playCardOrDraw'),
  resetAllCardsById: require('./resetAllCardsById')
};

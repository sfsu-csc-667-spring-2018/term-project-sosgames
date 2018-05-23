module.exports = {
  create: require('./createGame'),
  findById: require('./findGameById'),
  incrementRoundNumber: require('./incrementRoundNumber'),
  changeGameDirection: require('./changeGameDirection'),
  changeWinnerId: require('./changeWinnerId'),
  findNumberOfGames: require('./findNumberOfGames'),
  getAllGames: require('./getAllGames'),
  addCurrentPlayerIndex: require('./addCurrentPlayerIndex'),
  findCurrentPlayerIndexById: require('./findCurrentPlayerIndexByGameId'),
  findMaxNumberOfPlayersById: require('./findMaxNumberOfPlayersByGameId'),
  changeCurrentPlayerIndex: require('./changeCurrentPlayerIndex'),
  findIsReversedById: require('./findIsReversedByGameId'),
  nextPlayerTurn: require('./nextPlayerTurn'),
  verifyUserAndGame: require('./verifyUserAndGame'),
  getGameStateAndAPlayerHand: require('./getGameStateAndAPlayerHand'),
  isValidToStart: require('./isValidToStart'),
  getStartGameState: require('./getStartGameState'),
  play: require('./play'),
  getNextPlayerIndex: require('./getNextPlayerIndex'),
  getGameState: require('./getGameState')
};

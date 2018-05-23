module.exports = {
  create: require('./createUsersGames'),
  findByUserId: require('./findByUserId'),
  findByGameId: require('./findByGameId'),
  findByUserAndGameId: require('./findByUserAndGameId'),
  findNumberOfJoinedPlayers: require('./findNumberOfJoinedPlayers'),
  findCurrentScoreById: require('./findCurrentScoreById'),
  addCurrentScoreById: require('./addCurrentScoreById'),
  changeCurrentScoreById: require('./changeCurrentScoreById'),
  findNumberOfCardsById: require('./findNumberOfCardsById'),
  changeNumberOfCardsById: require('./changeNumberOfCardsById'),
  incrementNumberOfCardsById: require('./incrementNumberOfCardsById'),
  decrementNumberOfCardsById: require('./decrementNumberOfCardsById'),
  incrementWinnerCurrentScoreById: require('./incrementWinnerCurrentScoreByUserAndGameId')
};

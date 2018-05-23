const database = require('../connection');

const findNumberOfJoinedPlayers = require('../usersGames/findNumberOfJoinedPlayers');

const findCurrentPlayerIndex = require('../games/findCurrentPlayerIndexByGameId');
const findIsReversedById = require('../games/findIsReversedByGameId');

const findTopCard = require('../gamesCards/findTopCardByGameId');

const findMaxNumberOfPlayersById = require('./findMaxNumberOfPlayersByGameId');

const parseCardValue = cardValue => {
  if (
    cardValue === 'skip' ||
    cardValue === 'draw-two' ||
    cardValue === 'wild-draw-four'
  ) {
    return 2;
  } else {
    return 1;
  }
};

const getNextPlayerIndex = (gameId, isSpecialCase = false) => {
  return Promise.all([
    findNumberOfJoinedPlayers(gameId),
    findCurrentPlayerIndex(gameId),
    findTopCard(gameId),
    findIsReversedById(gameId)
  ]).then(([numberOfPlayers, game, topCard, gameStatus]) => {
    let numberOfTurnsToSkip = parseCardValue(topCard.value);

    if (isSpecialCase) {
      numberOfTurnsToSkip = 1;
    }

    if (gameStatus.is_reversed) {
      numberOfTurnsToSkip *= -1;
    }

    const newCurrentPlayerIndex =
      (+numberOfPlayers.count +
        game.current_player_index +
        numberOfTurnsToSkip) %
      numberOfPlayers.count;

    return newCurrentPlayerIndex;
  });
};

module.exports = getNextPlayerIndex;

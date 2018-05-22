const database = require('../connection');

const findNumberOfJoinedPlayers = require('../usersGames/findNumberOfJoinedPlayers')
  .findNumberOfJoinedPlayers;
const findCurrentPlayerIndex = require('../games/findCurrentPlayerIndexByGameId')
  .findCurrentPlayerIndexById;
const findTopCard = require('../gamesCards/findTopCardByGameId')
  .findTopCardByGameId;
const findIsReversedById = require('../games/findIsReversedByGameId')
  .findIsReversedById;
const findMaxNumberOfPlayersById = require('./findMaxNumberOfPlayersByGameId')
  .findMaxNumberOfPlayersById;

const parseCardValue = cardValue => {
  // if card = skip, draw-2, draw-4-wild return 2
  // else card = reverse -1
  // else card = every other card return 1
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

    // if game is reversed go backwards
    if (gameStatus.is_reversed) {
      numberOfTurnsToSkip *= -1;
    }

    // calculate new index
    const newCurrentPlayerIndex =
      (+numberOfPlayers.count +
        game.current_player_index +
        numberOfTurnsToSkip) %
      numberOfPlayers.count;

    return newCurrentPlayerIndex;
  });
};

module.exports = getNextPlayerIndex;

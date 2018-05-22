const database = require('../connection');
const findGameById = require('./findGameById').findById;
const findCurrentPlayerIndexById = require('./findCurrentPlayerIndexByGameId')
  .findCurrentPlayerIndexById;
const gamesCards = require('../gamesCards');
const usersGames = require('../usersGames');

const getGameState = gameId => {
  return Promise.all([
    findGameById(gameId),
    findCurrentPlayerIndexById(gameId),
    gamesCards.findTopCardByGameId(gameId),
    gamesCards.findAllCardsInHandsById(gameId),
    usersGames.findByGameId(gameId)
  ]).then(([game, currentIndex, cardOnTop, hands, players]) => {
    let currentPlayerIndex = currentIndex.current_player_index;
    let currentUserId = -1;
    let playersHands = {};

    for (const [index, player] of players.entries()) {
      if (index === currentPlayerIndex) {
        player.currentPlayer = true;
        currentUserId = player.user_id;
      }
      playersHands[player.user_id] = [];
    }

    for (const card of hands) {
      if (card.user_id !== currentUserId) {
        card.disabled = true;
      } else {
        if (cardOnTop.value.includes('wild')) {
          // cardontop=wild
          if (
            card.color != cardOnTop.wild_color &&
            !card.value.includes('wild')
          ) {
            card.disabled = true;
          }
        } else {
          // cardontop != wild
          if (
            card.color != cardOnTop.color &&
            card.value != cardOnTop.value &&
            !card.value.includes('wild')
          ) {
            card.disabled = true;
          }
        }
      }

      playersHands[card.user_id].push(card);
    }

    return Promise.resolve({ game, players, playersHands });
  });
};

module.exports = getGameState;

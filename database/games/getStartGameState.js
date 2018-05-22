const database = require('../connection');
const changeCurrentPlayerIndex = require('./changeCurrentPlayerIndex');
const gamesCards = require('../gamesCards');
const usersGames = require('../usersGames');
const INITIAL_PLAYER_INDEX = 0;

const getStartGameState = gameId => {
  return Promise.all([
    gamesCards.flipTopCard(gameId),
    gamesCards.dealCards(gameId),
    usersGames.findByGameId(gameId),
    changeCurrentPlayerIndex(INITIAL_PLAYER_INDEX, gameId)
  ]).then(([cardOnTop, hands, players, currentIndex]) => {
    let currentPlayerIndex = currentIndex.current_player_index;
    let playersHands = {};

    for (const [index, player] of players.entries()) {
      if (index === currentPlayerIndex) {
        player.currentPlayer = true;
      }
    }

    for (const [index, player] of players.entries()) {
      let hand = [];
      for (const card of hands) {
        if (player.user_id === card.user_id) {
          if (
            index != currentPlayerIndex ||
            (!card.color.includes(cardOnTop.color) &&
              !card.value.includes(cardOnTop.value) &&
              !card.value.includes('wild'))
          ) {
            card.disabled = true;
          }
          hand.push(card);
        }
      }
      playersHands[player.user_id] = hand;
    }

    return { cardOnTop, playersHands, players };
  });
};

module.exports = getStartGameState;

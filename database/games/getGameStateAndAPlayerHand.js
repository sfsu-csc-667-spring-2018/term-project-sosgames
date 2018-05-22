const database = require('../connection');
const findGameById = require('./findGameById').findById;
const findCurrentPlayerIndexById = require('./findCurrentPlayerIndexByGameId')
  .findCurrentPlayerIndexById;
const gamesCards = require('../gamesCards');
const usersGames = require('../usersGames');

const GET_CARD_ON_TOP =
  'SELECT * FROM cards WHERE cards.id IN (SELECT games_cards.card_id FROM games_cards WHERE game_id=$1 AND on_top=true);';

// const GET_PLAYERS_IN_GAME =
//   'SELECT users_games.user_id, users.username, users.profile_picture_path, users_games.current_score, users_games.number_of_cards FROM users, users_games WHERE users.id=users_games.user_id AND game_id=$1;';

const GET_PLAYER_HAND =
  'select * from cards where id in (select card_id FROM games_cards WHERE game_id=$1 and user_id=$2 AND in_hand=true);';

const getGameStateAndAPlayerHand = (gameId, userId) => {
  return Promise.all([
    findGameById(gameId),
    findCurrentPlayerIndexById(gameId),
    database.oneOrNone(GET_CARD_ON_TOP, [gameId]),
    usersGames.findByGameId(gameId),
    database.any(GET_PLAYER_HAND, [gameId, userId])
  ]).then(([game, playerIndex, cardOnTop, players, playerHand]) => {
    let currentPlayerIndex = playerIndex.current_player_index;
    console.log('currentPlayerIndex:');
    console.log(currentPlayerIndex);
    console.log('\n');

    let yourIndex = -1;

    for (const [index, player] of players.entries()) {
      if (currentPlayerIndex === index) {
        player.currentPlayer = true;
      }
      if (player.user_id == userId) {
        player.isYou = true;
        yourIndex = index;
      }
    }

    for (const card of playerHand) {
      if (yourIndex !== currentPlayerIndex) {
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
    }

    return Promise.resolve({ game, cardOnTop, players, playerHand });
  });
};

module.exports = getGameStateAndAPlayerHand;

const database = require('../connection');
const findGameById = require('./findGameById').findById;

const GET_CARD_ON_TOP =
  'SELECT * FROM cards WHERE cards.id IN (SELECT games_cards.card_id FROM games_cards WHERE game_id=$1 AND on_top=true);';

const GET_PLAYERS_IN_GAME =
  'SELECT users_games.user_id, users.username, users_games.current_score, users_games.number_of_cards FROM users, users_games WHERE users.id=users_games.user_id AND game_id=$1;';

const GET_PLAYER_HAND =
  'select * from cards where id in (select card_id FROM games_cards WHERE game_id=$1 and user_id=$2 AND in_hand=true);';

const getGameStateAndAPlayerHand = (gameId, userId) => {
  return Promise.all([
    findGameById(gameId),
    database.oneOrNone(GET_CARD_ON_TOP, [gameId]),
    database.any(GET_PLAYERS_IN_GAME, [gameId]),
    database.any(GET_PLAYER_HAND, [gameId, userId])
  ]).then(([game, cardOnTop, players, playerHand]) => {
    for (const player of players) {
      if (player.user_id == userId) {
        player.isYou = true;
      }
    }
    return Promise.resolve({ game, cardOnTop, players, playerHand });
  });
};

module.exports = getGameStateAndAPlayerHand;

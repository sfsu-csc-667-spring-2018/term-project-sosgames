const database = require('../connection');

const addUserToGame = require('../usersGames/createUsersGames');
const getUserDataById = require('../users/getUserDataById');
const findGameById = require('./findGameById');

const IS_USER_IN_GAME =
  'SELECT * FROM users_games WHERE user_id=$1 AND game_id=$2';

const CURRENT_PLAYER_INDEX_OF_GAME =
  'SELECT current_player_index FROM games WHERE id=$1';

const CURRENT_PLAYERS_COUNT_IN_GAME =
  'SELECT COUNT(*) FROM users_games WHERE users_games.game_id=$1';

const MAX_PLAYERS_COUNT_IN_GAME =
  'SELECT max_number_of_players FROM games WHERE id=$1';

const verifyUserAndGame = (gameId, user) => {
  return Promise.all([
    findGameById(gameId),
    database.oneOrNone(IS_USER_IN_GAME, [user.id, gameId]),
    database.oneOrNone(CURRENT_PLAYER_INDEX_OF_GAME, [gameId]),
    database.oneOrNone(CURRENT_PLAYERS_COUNT_IN_GAME, [gameId]),
    database.oneOrNone(MAX_PLAYERS_COUNT_IN_GAME, [gameId])
  ]).then(
    ([
      game,
      isUserInGame,
      currentPlayerIndexData,
      playersCount,
      maxPlayersCount
    ]) => {
      if (isUserInGame) {
        return getUserDataById(isUserInGame.user_id).then(playerInGame => {
          return { game, playerInGame };
        });
      } else {
        if (
          currentPlayerIndexData.current_player_index === -1 &&
          +playersCount.count < maxPlayersCount.max_number_of_players
        ) {
          return addUserToGame(user.id, gameId).then(usersGamesData => {
            return getUserDataById(usersGamesData.user_id).then(
              playerInGame => {
                return { game, playerInGame };
              }
            );
          });
        } else {
          throw 'You may not join that game -- Game already started.';
        }
      }
    }
  );
};

module.exports = verifyUserAndGame;

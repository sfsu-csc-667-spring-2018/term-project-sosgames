const database = require('../connection');
const addUserToGame = require('../usersGames').create;
const getUserDataById = require('../users').getUserDataById;
const findGameById = require('./findGameById').findById;

// old stuff man ignore plz
// 1. I am a user trying to enter a game that has space and has not started
const IN_PROGRESS_GAMES_WITH_PLAYER_COUNT =
  'SELECT *, (SELECT COUNT(*) FROM users_games WHERE users_games.game_id=$1) AS current_player_count FROM games WHERE games.id=$1 AND games.current_player_index<>-1';
// 2. I am already a user in the game

// WORKING STUFF
const IS_USER_IN_GAME =
  'SELECT * FROM users_games WHERE user_id=$1 AND game_id=$2';

const CURRENT_PLAYER_INDEX_OF_GAME =
  'SELECT current_player_index FROM games WHERE id=$1';

const CURRENT_PLAYERS_COUNT_IN_GAME =
  'SELECT COUNT(*) FROM users_games WHERE users_games.game_id=$1';

const MAX_PLAYERS_COUNT_IN_GAME =
  'SELECT max_number_of_players FROM games WHERE id=$1';

const verifyUserAndGame = (gameId, user) => {
  console.log(user);
  console.log('PROMISE CRAP:');

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
      console.log(game);
      console.log(isUserInGame); // null OR object
      console.log(currentPlayerIndexData); //currentPlayerIndexData.current_player_index
      console.log(playersCount); //playersCount.count
      console.log(maxPlayersCount);

      // If user is in game
      if (isUserInGame) {
        console.log('user in game');
        return getUserDataById(isUserInGame.user_id).then(playerInGame => {
          return { game, playerInGame };
        });
      } else {
        // If user is NOT in game
        if (
          currentPlayerIndexData.current_player_index === -1 &&
          +playersCount.count < maxPlayersCount.max_number_of_players
        ) {
          // If game has not started and game has space
          console.log('not in game and not started --> can join');
          return addUserToGame(user.id, gameId).then(usersGamesData => {
            return getUserDataById(usersGamesData.user_id).then(
              playerInGame => {
                return { game, playerInGame };
              }
            );
          });
        } else {
          // If game does not have space, no matter if it started already or not
          // kick out to lobby
          throw 'You may not join that game -- Game already started.';
        }
      }
    }
  );
};

module.exports = verifyUserAndGame;

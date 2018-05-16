const database = require('../connection');
const addUserToGame = require('../usersGames').create;
const findGameById = require('./findGameById').findById;

// 1. I am a user trying to enter a game that has space and has not started
const GAMES_WITH_PLAYER_COUNT =
  'SELECT *, (SELECT COUNT(*) FROM users_games WHERE users_games.game_id=$1) AS current_player_count FROM games WHERE games.id=$1 AND games.current_player_index<>-1';
// 2. I am already a user in the game
const AM_I_IN_THE_GAME =
  'SELECT * FROM users_games WHERE user_id=$1 AND game_id=$2';

const verifyUserAndGame = (gameId, user) => {
  return Promise.all([
    findGameById(gameId),
    database.any(GAMES_WITH_PLAYER_COUNT, [gameId]),
    database.any(AM_I_IN_THE_GAME, [gameId, user.id])
  ])
    .then(([currentGame, game, player]) => {
      if (game.length === 0 && player.length === 0) {
        // The game does not exist or the game has started, I am not in the game
        // --> redirect to lobby
        throw 'You may not join that game.';
      } else if (
        player.length === 0 &&
        game[0].current_player_count < game[0].max_player_count
      ) {
        // The game exists, I am not in it, and I can be added
        // --> Add me to the game
        console.log('why man');
        return addUserToGame(player[0].user_id, game[0].id).then(() => {
          console.log('add player');
          return Promise.resolve();
        });
      } else if (player.length === 0) {
        // The game is full
        // --> redirect to lobby
        throw 'You may not join that game.';
      } else if (player.length === 1) {
        // I am in the game
        // --> Send game state
        // TODO: do a join users and users_games
        console.log('i am in the game');
        return Promise.resolve({ currentGame, player });
      }
    })
    .catch(error => {
      console.log('u fu');
      console.log(error);
    });
};

module.exports = verifyUserAndGame;

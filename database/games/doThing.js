const database = require('../connection');

// 1. I am a user trying to enter a game that has space and has not started
const GAMES_WITH_PLAYER_COUNT =
  'SELECT *, (SELECT COUNT(*) FROM users_games WHERE users_games.game_id=$1) AS current_player_count FROM games WHERE games.id=$1 AND games.current_player_index != NULL';
// 2. I am already a user in the game
const AM_I_IN_THE_GAME =
  'SELECT * FROM users_games WHERE user_id=$1 AND game_id=$2';

const addUserToGame = (game, user) =>
  database.any('INSERT INTO ... ETC').then(result => ({ game, user }));

const doThing = (gameId, user) => {
  return Promise.all([
    database.any(GAMES_WITH_PLAYER_COUNT),
    database.any(AM_I_IN_THE_GAME)
  ]).then(([game, me]) => {
    if (game.length === 0) {
      // The game does not exist or the game has started
      // --> redirect to lobby
      throw 'You may not join that game.';
    } else if (
      me.length === 0 &&
      game[0].current_player_count < game[0].max_player_count
    ) {
      // The game exists, I am not in it, and I can be added
      // --> Add me to the game
      return addUserToGame(game, user);
    } else if (me.length === 0) {
      // The game is full
      // --> redirect to lobby
      throw 'You may not join that game.';
    } else if (me.length === 1) {
      // I am in the game
      // --> Send game state
      return Promise.resolve({ game, user });
    }
  });
};

module.exports = doThing;

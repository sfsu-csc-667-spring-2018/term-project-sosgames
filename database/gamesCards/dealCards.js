const database = require('../connection');
const draw = require('./draw').draw;

const INITIAL_CARDS_COUNT = 7;
const GET_PLAYERS_IN_GAME = 'SELECT * FROM users_games WHERE game_id=$1;';

const promiseSerial = funcs =>
  funcs.reduce(
    (promise, func) =>
      promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([])
  );

const dealCards = gameId => {
  return Promise.all([database.any(GET_PLAYERS_IN_GAME, [gameId])]).then(
    ([players]) => {
      // convert each player to a function that returns a promise for drawing cards
      const funcs = players.map(player => () =>
        draw(gameId, player.user_id, INITIAL_CARDS_COUNT)
      );

      // execute Promises in serial
      return promiseSerial(funcs);
    }
  );
};

module.exports = dealCards;

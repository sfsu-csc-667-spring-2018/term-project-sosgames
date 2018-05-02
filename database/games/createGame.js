// const database = require('../connection');

// const CREATE_GAME_QUERY = `INSERT INTO games (name, number_of_players) VALUES ($1, $2) RETURNING *` ;

// module.exports={ //gameName and number of players to database and update functions
//   createGame: (gameName, numberOfPlayers) => database.one( CREATE_GAME_QUERY, [ gameName, numberOfPlayers ] )
// }

const database = require('../connection');

const CREATE_GAME_QUERY = `INSERT INTO games (name, number_of_players) VALUES ($1, $2) RETURNING *` ;

const create = (gameName, numberOfPlayers) => database.one( CREATE_GAME_QUERY, [ gameName, numberOfPlayers ] );

module.exports={ //gameName and number of players to database and update functions
  create
}
const database = require('../connection');

const CREATEGAME = `INSERT INTO games (name, number_of_players) VALUES ($1, $2) RETURNING *` ;

// `INSERT INTO games (round_number, is_reversed, winner_id, game_name, number_of_players) VALUES ($1, $2, $3, $4, $5) RETURNING *`

module.exports={ //gameName and number of players to database and update functions
  createGame: (gameName, numberOfPlayers) => database.one( CREATEGAME, [ gameName, numberOfPlayers ] )
}
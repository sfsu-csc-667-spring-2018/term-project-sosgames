const database = require('../connection');

const CREATEGAME = `INSERT INTO games (round_number, is_reversed, winner_id) VALUES ($1, $2, $3) RETURNING *` ;

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> changed creategame parameters
// `INSERT INTO games (round_number, is_reversed, winner_id, game_name, number_of_players) VALUES ($1, $2, $3, $4, $5) RETURNING *`

module.exports={ //gameName and number of players to database and update functions
  createGame: (gameName, numberOfPlayers) => database.one( CREATEGAME, [ 1, false, null ] )
<<<<<<< HEAD
=======
module.exports={
  createGame: ( round_number, is_reversed, winner_id ) => database.one( CREATEGAME, [ 0, false, null ] )
>>>>>>> able to create a game in the games table
=======
>>>>>>> changed creategame parameters
}
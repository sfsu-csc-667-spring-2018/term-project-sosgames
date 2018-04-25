const database = require('../connection');

const CREATEGAME = `INSERT INTO games (round_number, is_reversed, winner_id) VALUES ($1, $2, $3) RETURNING *` ;

module.exports={
  createGame: ( round_number, is_reversed, winner_id ) => database.one( CREATEGAME, [ 0, false, null ] )
}
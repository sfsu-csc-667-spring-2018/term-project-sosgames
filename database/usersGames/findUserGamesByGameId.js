const database = require('../connection');

const FIND_USER_GAME_BY_GAME_ID_QUERY = `SELECT * FROM users_games WHERE game_id = $1` ;

const findByGameId = (gameId) => database.one( FIND_USER_GAME_BY_GAME_ID_QUERY, [ gameId ] );

module.exports={
  findByGameId
}
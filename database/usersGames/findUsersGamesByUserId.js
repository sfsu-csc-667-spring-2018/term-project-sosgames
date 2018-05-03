const database = require('../connection');

const FIND_USER_GAME_BY_USER_ID_QUERY = `SELECT * FROM users_games WHERE user_id = $1` ;

const findByUserId = (userId) => database.many( FIND_USER_GAME_BY_USER_ID_QUERY, [ userId ] );

module.exports={
  findByUserId
}
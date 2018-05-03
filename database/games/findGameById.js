const database = require('../connection');

const FIND_GAME_BY_ID_QUERY = `SELECT * FROM games WHERE id = $1`;

const findById = (id) => database.one( FIND_GAME_BY_ID_QUERY, id);

module.exports={
  findById
}
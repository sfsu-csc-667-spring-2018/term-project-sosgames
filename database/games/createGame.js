const database = require('../connection');

const CREATE_GAME_QUERY = `INSERT INTO games (name, number_of_players) VALUES ($1, $2) RETURNING *` ;

const create = (gameName, numberOfPlayers) => database.one( CREATE_GAME_QUERY, [ gameName, numberOfPlayers ] );

module.exports={
  create
}
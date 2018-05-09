const database = require('../connection');

// default values of current_score and number_of_cards will be removed when migration is updated

const CREATE_USER_GAME_QUERY = `INSERT INTO users_games (user_id, game_id, current_score, number_of_cards) VALUES ($1, $2, $3, $4) RETURNING *` ;

const create = (userId, gameId) => database.one( CREATE_USER_GAME_QUERY, [ userId, gameId, 0, 0 ] );

module.exports={
  create
}
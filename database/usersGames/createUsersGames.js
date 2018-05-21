const database = require('../connection');

const CREATE_USER_GAME_QUERY = `INSERT INTO users_games (user_id, game_id) VALUES ($1, $2) RETURNING *`;

const create = (userId, gameId) =>
  database.one(CREATE_USER_GAME_QUERY, [userId, gameId]);

module.exports = {
  create
};

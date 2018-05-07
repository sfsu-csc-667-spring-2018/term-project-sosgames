const database = require('../connection');
const findById = require('./findGameById').findById;

const UPDATE_IN_HAND_QUERY = `UPDATE games SET is_reversed = $1 WHERE id = $2`;

module.exports = {};

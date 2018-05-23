const db = require('../connection');

const GET_USER_DATA_BY_ID = `SELECT * FROM users WHERE id = $1`;

const getUserDataById = id => {
  return db.one(GET_USER_DATA_BY_ID, [id]);
};

module.exports = getUserDataById;

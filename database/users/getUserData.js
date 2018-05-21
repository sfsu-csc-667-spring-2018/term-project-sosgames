const db = require('../connection');

const GET_USER_DATA = `SELECT * FROM users WHERE username = $1`;

const getUserData = username => {
  return db.oneOrNone(GET_USER_DATA, [username]);
};

module.exports = {
  getUserData
};

const db = require('../connection');

const GET_USERNAME = `SELECT username FROM users WHERE username = $1`;

const isUserNameInUse = username => {
  return db.oneOrNone(GET_USERNAME, [username]);
};

module.exports = isUserNameInUse;

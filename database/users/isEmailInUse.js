const db = require('../connection');

const GET_EMAIL = `SELECT email FROM users WHERE email = $1`;

const isEmailInUse = email => {
  return db.oneOrNone(GET_EMAIL, [email]);
};

module.exports = {
  isEmailInUse
};

const pgp = require('pg-promise')();

if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'production'
) {
  require('dotenv').config();
}

const connection = pgp(process.env.DATABASE_URL);
module.exports = connection;

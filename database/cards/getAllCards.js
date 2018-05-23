const database = require('../connection');

const GET_ALL_CARDS_QUERY = `SELECT * FROM cards`;

const getAll = () => {
  return database.many(GET_ALL_CARDS_QUERY);
};

module.exports = getAll;

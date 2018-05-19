const db = require('../connection');

const GET_TOP_TEN = `SELECT * FROM users ORDER BY total_score DESC LIMIT 10`;

const getTopTenScores = () => {
  return db.many(GET_TOP_TEN);
};

module.exports = {
  getTopTenScores
};

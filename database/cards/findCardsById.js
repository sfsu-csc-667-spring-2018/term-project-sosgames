const database = require('../connection');

const FIND_CARD_BY_ID_QUERY = `SELECT * FROM cards WHERE id = $1`;

const findById = (cardId) => {
  return database.one( FIND_CARD_BY_ID_QUERY, cardId);
}

module.exports={
  findById
}
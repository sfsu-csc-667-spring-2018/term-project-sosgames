const database = require('../connection');
const getAllCards = require('../cards/getAllCards').getAll;

const CREATE_GAME_CARD_QUERY = `INSERT INTO games_cards (game_id, card_id) VALUES ($1, $2)`;
// make default 
// in_hand to false
// in_deck to true
// on_top to false 
// maybe user_id and wild_color to null

const create = (gameId) => {
  getAllCards()
    .then( (cards) => {
      for(card in cards) {
        database.none( CREATE_GAME_CARD_QUERY, [ gameId, cards[card].id ] );
      }
    } )
}

module.exports={
  create
}
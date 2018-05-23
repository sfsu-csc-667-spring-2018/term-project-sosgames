const database = require('../connection');

const findTopCardByGameId = require('./findTopCardByGameId')
  .findTopCardByGameId;
const findAllPlayableCardsById = require('./findAllPlayableCardsByGameAndUserId');
const draw = require('./draw').draw;
const playCard = require('./playCard').playCard;
const nextPlayerTurn = require('../games/nextPlayerTurn').nextPlayerTurn;

const playCardOrDraw = (gameId, userId) => {
  return findTopCardByGameId(gameId)
    .then(topCard => {
      return findAllPlayableCardsById(
        gameId,
        userId,
        topCard.value,
        topCard.color
      ).then(playableCards => {
        if (playableCards.length === 0) {
          //cannot play any card from hand
          return draw(gameId, userId)
            .then(card => {
              if (
                card[0].value === topCard.value ||
                card[0].color === topCard.color ||
                card[0].point_value === 50 ||
                card[0].color === topCard.wild_color
              ) {
                //can play card after draw
                return playCard(gameId, card[0].card_id, userId).then(() => {
                  return nextPlayerTurn(gameId, true);
                });
              } else {
                //skipped turn
                return nextPlayerTurn(gameId, true);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          //have card that can be played
          return { canPlayCard: true };
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = playCardOrDraw;

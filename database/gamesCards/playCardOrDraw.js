const database = require('../connection');

const findTopCardByGameId = require('./findTopCardByGameId');
const findAllPlayableCardsById = require('./findAllPlayableCardsByGameAndUserId');
const draw = require('./draw');
const playCard = require('./playCard');
const nextPlayerTurn = require('../games/nextPlayerTurn');

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
          return draw(gameId, userId)
            .then(card => {
              if (
                card[0].value === topCard.value ||
                card[0].color === topCard.color ||
                card[0].point_value === 50 ||
                card[0].color === topCard.wild_color
              ) {
                return playCard(gameId, card[0].card_id, userId).then(() => {
                  return nextPlayerTurn(gameId, true);
                });
              } else {
                return nextPlayerTurn(gameId, true);
              }
            })
            .catch(error => {});
        } else {
          return { canPlayCard: true };
        }
      });
    })
    .catch(error => {});
};

module.exports = playCardOrDraw;

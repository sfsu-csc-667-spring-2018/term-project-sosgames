const database = require('../connection');

const findTopCardByGameId = require('./findTopCardByGameId')
  .findTopCardByGameId;
const findAllPlayableCardsBy = require('./findAllPlayableCardsByGameAndUserId');
const draw = require('./draw').draw;
const playCard = require('./playCard').playCard;

const playCardOrDraw = (gameId, userId) => {
  findTopCardByGameId(gameId)
    .then(topCard => {
      findAllPlayableCardsBy(gameId, userId, topCard.value, topCard.color).then(
        playableCards => {
          if (playableCards.length === 0) {
            draw(gameId, userId)
              .then(card => {
                console.log(card);
                console.log(`top card value ${topCard.value}`);
                console.log(`top card color ${topCard.color}`);
                if (
                  card[0].value === topCard.value ||
                  card[0].color === topCard.color ||
                  card[0].point_value === 50
                ) {
                  console.log('play card');
                  playCard(gameId, card[0].card_id, userId).then(() => {
                    console.log('card has been played');
                  });
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            console.log('here');
          }
        }
      );
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = playCardOrDraw;

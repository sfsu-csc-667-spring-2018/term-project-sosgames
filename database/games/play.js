const database = require('../connection');
const gamesCards = require('../gamesCards');
const usersGames = require('../usersGames');
const findById = require('./findGameById').findById;
const findCurrentPlayerIndexById = require('./findCurrentPlayerIndexByGameId')
  .findCurrentPlayerIndexById;
const nextPlayerTurn = require('./nextPlayerTurn').nextPlayerTurn;
const changeGameDirection = require('./changeGameDirection')
  .changeGameDirection;
const getNextPlayerIndex = require('./getNextPlayerIndex');

const drawCardsAndSkip = (gameId, players, numberOfCardsToDraw) => {
  console.log('draw card and skip man');

  return getNextPlayerIndex(gameId).then(nextIndex => {
    console.log('nextindex is:');
    console.log(nextIndex);
    console.log(players);

    let nextUserId = -1;
    for (const [index, player] of players.entries()) {
      if (index === nextIndex) {
        nextUserId = player.user_id;
      }
    }
    console.log('draw 2 for this userid');
    console.log(nextUserId);

    return Promise.all([
      gamesCards.draw(gameId, nextUserId, numberOfCardsToDraw),
      nextPlayerTurn(gameId)
    ]);
  });
};

const play = gameId => {
  return Promise.all([
    gamesCards.findTopCardByGameId(gameId),
    gamesCards.findAllCardsInHandsById(gameId),
    gamesCards.findAllCardsInDeckById(gameId),
    usersGames.findByGameId(gameId),
    findCurrentPlayerIndexById(gameId)
  ]).then(([cardOnTop, hands, cardsInDeck, players, index]) => {
    console.log(hands);
    console.log(index);

    // Game logic - check cardOnTop
    // - next turn
    // - direction
    // - number of cards for next person (+ next next person???)

    if (cardsInDeck.length > 2) {
      console.log('draw two man');
      return drawCardsAndSkip(gameId, players, 2);
    } else {
      return gamesCards.resetDeck(gameId).then(() => {
        return drawCardsAndSkip(gameId, players, 2);
      });
    }

    // switch (cardOnTop.value) {
    //   case 'reverse':
    //     return changeGameDirection(gameId)
    //     .then(() => {
    //       return nextPlayerTurn(gameId);
    //     });
    //     break;

    //   case 'draw-two':
    //   case 'wild-draw-four':
    //     if (cardsInDeck.length > 2) {
    //       console.log('draw two man');
    //       return drawCardsAndSkip(gameId, players, 2);
    //     } else {
    //       return gamesCards.resetDeck(gameId)
    //         .then(() => {
    //           return drawCardsAndSkip(gameId, players, 2);
    //         });
    //     }
    //     break;

    //   case 'wild':
    //   // case 'wild-draw-four':
    //   break;

    //   default:
    //     return nextPlayerTurn(gameId);
    //     break;
    // }

    // return players;
  });
};

module.exports = play;

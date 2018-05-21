const NUMBER_OF_CARDS = 7;

const dealCards = (cardsInGame, usersGamesData) => {
  let cardsInHands = {};

  for (const userGame of usersGamesData) {
    let handOfUser = {};

    let dealtCards = [];
    while (dealtCards.length != NUMBER_OF_CARDS) {
      let cardIndex = pickRandomIndex(cardsInGame.length);
      let card = cardsInGame[cardIndex];
      card.user_id = userGame.user_id;
      card.in_hand = true;
      dealtCards.push(card);
      cardsInGame.splice(cardIndex, 1);
    }
    handOfUser.cards = dealtCards;
    cardsInHands[userGame.user_id] = handOfUser;
  }

  return cardsInHands;
};

const pickRandomIndex = length => {
  return Math.floor(Math.random() * (length - 1));
};

module.exports = dealCards;

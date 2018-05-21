const selectCardOnTop = cards => {
  let cardIndex = pickRandomIndex(cards.length);

  // Check if card is a numbered card
  while (isNaN(+cards[cardIndex].value)) {
    // Pick another card
    cardIndex = pickRandomIndex(cards.length);
  }

  cards[cardIndex].on_top = true;
  return [cardIndex, cards[cardIndex]];
};

const pickRandomIndex = length => {
  return Math.floor(Math.random() * (length - 1));
};

module.exports = selectCardOnTop;

const selectCardOnTop = (cards) => {
  let cardIndex = pickRandomIndex(cards.length);
  
  // Check if card is a numbered card
  while (isNaN(+cards[cardIndex].value)) {
    // Remove the not numbered card
    cards.splice(cardIndex, 1);
    
    // Pick another card
    cardIndex = pickRandomIndex(cards.length);
  }

  cards[cardIndex].onTop = true;
  return cards[cardIndex];
};

const pickRandomIndex = (length) => {
  return Math.floor(Math.random() * (length - 1));
};

module.exports = selectCardOnTop;
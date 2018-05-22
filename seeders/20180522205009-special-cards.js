'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let cards = [];
    let colors = ['red', 'yellow', 'green', 'blue'];
    // let actions = ['draw-two'];
    let wild_cards = ['wild'];
    // let wild_cards = ['wild', 'wild-draw-four'];

    cards.push(createColoredCards(createNumeredArray(0, 5), colors));

    // cards.push(createColoredCards(actions, colors, 20));
    // cards.push(createColoredCards(actions, colors, 20));

    cards.push(createWildCards(wild_cards, 10));

    cards = [].concat(...cards);
    return queryInterface.bulkInsert('cards', cards, {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('cards', null, {});
  }
};

function createNumeredArray(start, end) {
  let arr = [];
  let number = start;
  for (let index = 0; index <= end - start; index++) {
    arr[index] = '' + number;
    number++;
  }
  return arr;
}

function createColoredCards(values, colors, point) {
  let cards = [];

  for (let value of values) {
    for (let color of colors) {
      let card = {
        value: value,
        color: color,
        point_value: point || +value,
        image_path: '../public/images/spritesheet_uno_large.png',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      cards.push(card);
    }
  }

  return cards;
}

function createWildCards(values, count) {
  let cards = [];

  for (let value of values) {
    for (let index = 0; index < count; index++) {
      let card = {
        value: value,
        color: value,
        point_value: 50,
        image_path: '../public/images/spritesheet_uno_large.png',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      cards.push(card);
    }
  }

  return cards;
}

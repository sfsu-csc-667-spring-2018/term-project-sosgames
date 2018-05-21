'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('games_cards', 'in_deck', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('games_cards', 'in_deck', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  }
};

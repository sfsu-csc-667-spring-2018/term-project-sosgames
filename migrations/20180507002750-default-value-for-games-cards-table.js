'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('games_cards', 'in_hand', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
    queryInterface.changeColumn('games_cards', 'in_deck', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
    queryInterface.changeColumn('games_cards', 'on_top', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('games_cards', 'in_hand', {
      type: Sequelize.BOOLEAN
    });
    queryInterface.changeColumn('games_cards', 'in_deck', {
      type: Sequelize.BOOLEAN
    });
    queryInterface.changeColumn('games_cards', 'on_top', {
      type: Sequelize.BOOLEAN
    });
  }
};

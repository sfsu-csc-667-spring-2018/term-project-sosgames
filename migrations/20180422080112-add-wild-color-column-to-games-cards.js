'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'games_cards',
      'wild_color',
      {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('games_cards', 'wild_color');
  }
};

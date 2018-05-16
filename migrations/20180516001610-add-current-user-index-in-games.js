'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('games', 'current_player_index', {
      type: Sequelize.INTEGER,
      defaultValue: -1
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('games', 'current_player_index');
  }
};

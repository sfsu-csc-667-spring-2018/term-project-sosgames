'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('users_games', 'current_score', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
    queryInterface.changeColumn('users_games', 'number_of_cards', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('users_games', 'current_score', {
      type: Sequelize.INTEGER
    });
    queryInterface.changeColumn('users_games', 'number_of_cards', {
      type: Sequelize.INTEGER
    });
  }
};

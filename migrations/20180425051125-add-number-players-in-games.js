'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('games', 'number_of_players', {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: { min: 2, max: 12 }
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('games', 'number_of_players');
  }
};

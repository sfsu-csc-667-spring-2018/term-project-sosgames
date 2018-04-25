'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'games',
      'name',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('games', 'name');
  }
};

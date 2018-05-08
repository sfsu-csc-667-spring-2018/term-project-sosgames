'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.renameColumn(
      'games',
      'number_of_players',
      'max_number_of_players'
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.renameColumn(
      'games',
      'max_number_of_players',
      'number_of_players'
    );
  }
};

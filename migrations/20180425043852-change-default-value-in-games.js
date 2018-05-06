'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('games', 'round_number', {
      type: Sequelize.INTEGER,
      defaultValue: 1
    });

    queryInterface.changeColumn('games', 'is_reversed', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });

    queryInterface.changeColumn('games', 'winner_id', {
      type: Sequelize.INTEGER,
      defaultValue: null
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('games', 'round_number', {
      type: Sequelize.INTEGER
    });

    queryInterface.changeColumn('games', 'is_reversed', {
      type: Sequelize.BOOLEAN
    });

    queryInterface.changeColumn('games', 'winner_id', {
      type: Sequelize.INTEGER
    });
  }
};

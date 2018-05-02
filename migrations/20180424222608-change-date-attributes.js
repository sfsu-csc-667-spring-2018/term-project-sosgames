'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('cards', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    });
    queryInterface.changeColumn('cards', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    });

    queryInterface.changeColumn('users', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    });
    queryInterface.changeColumn('users', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    });

    queryInterface.changeColumn('games', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    });
    queryInterface.changeColumn('games', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    });

    queryInterface.changeColumn('games_cards', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    });
    queryInterface.changeColumn('games_cards', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    });

    queryInterface.changeColumn('users_games', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    });
    queryInterface.changeColumn('users_games', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('cards', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
    queryInterface.changeColumn('cards', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
  }
};

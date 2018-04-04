'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CardStatuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      game_session_id: {
        type: Sequelize.INTEGER
      },
      card_id: {
        type: Sequelize.INTEGER
      },
      in_hand: {
        type: Sequelize.BOOLEAN
      },
      in_deck: {
        type: Sequelize.BOOLEAN
      },
      in_discard: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CardStatuses');
  }
};
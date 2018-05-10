'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('users', 'username', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    });
    queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    });
    queryInterface.changeColumn('users', 'total_score', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
    queryInterface.changeColumn('users', 'profile_picture_path', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'images/no_profile_pic.png'
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('users', 'username', {
      type: Sequelize.STRING,
      unique: false
    });
    queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING,
      unique: false
    });
    queryInterface.changeColumn('users', 'total_score', {
      type: Sequelize.INTEGER
    });
    queryInterface.changeColumn('users', 'profile_picture_path', {
      type: Sequelize.STRING
    });
  }
};

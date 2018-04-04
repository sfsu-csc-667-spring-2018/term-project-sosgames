'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserInGame = sequelize.define('UserInGame', {
    user_id: DataTypes.INTEGER,
    game_session_id: DataTypes.INTEGER,
    user_game_session_id: DataTypes.INTEGER
  }, {});
  UserInGame.associate = function(models) {
    // associations can be defined here
  };
  return UserInGame;
};
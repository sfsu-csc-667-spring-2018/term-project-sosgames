'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserGameSession = sequelize.define('UserGameSession', {
    user_id: DataTypes.INTEGER,
    game_session_id: DataTypes.INTEGER,
    current_score: DataTypes.INTEGER
  }, {});
  UserGameSession.associate = function(models) {
    // associations can be defined here
  };
  return UserGameSession;
};
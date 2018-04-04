'use strict';
module.exports = (sequelize, DataTypes) => {
  var GameSession = sequelize.define('GameSession', {
    user_id: DataTypes.INTEGER,
    number_of_players: DataTypes.INTEGER,
    round_number: DataTypes.INTEGER
  }, {});
  GameSession.associate = function(models) {
    // associations can be defined here
  };
  return GameSession;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserGame = sequelize.define('UserGame', {
    user_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER,
    current_score: DataTypes.INTEGER,
    number_of_cards: DataTypes.INTEGER
  }, {});

  UserGame.associate = function(models) {
  };

  return UserGame;
};
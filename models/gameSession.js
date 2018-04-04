'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameSession = sequelize.define('GameSession', {
    user_id: DataTypes.INTEGER,
    number_of_players: DataTypes.INTEGER,
    round_number: DataTypes.INTEGER
  }, {});

  GameSession.associate = function (models) {
    GameSession.belongsToMany(models.User, {
      foreignKey: 'id'
    });
  };

  return GameSession;
};
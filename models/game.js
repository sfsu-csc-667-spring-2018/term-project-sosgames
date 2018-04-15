'use strict';
module.exports = (sequelize, DataTypes) => {
  var Game = sequelize.define('Game', {
    round_number: DataTypes.INTEGER,
    is_reversed: DataTypes.BOOLEAN,
    winner_id: DataTypes.INTEGER
  }, {});

  Game.associate = function(models) {
    Game.belongsTo( models.User, {
      foreignKey: 'winner_id',
      targetKey: 'id'
    });

    Game.belongsToMany(models.Card, { 
      through: GameCard
    });

    Game.belongsToMany(models.User, { 
      through: UserGame
    });
  };

  return Game;
};
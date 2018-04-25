'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    total_score: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Game, {
      foreignKey: 'winner_id',
      sourceKey: 'id'
    });

    User.belongsToMany(models.Card, {
      through: GameCard 
    });

    User.belongsToMany(models.Game, {
      through: UserGame 
    });
  };
  return User;
};
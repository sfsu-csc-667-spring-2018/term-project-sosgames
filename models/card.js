'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define(
    'card',
    {
      value: DataTypes.STRING,
      color: DataTypes.STRING,
      point_value: DataTypes.INTEGER,
      image_path: DataTypes.STRING
    },
    {}
  );

  Card.associate = function(models) {
    Card.belongsToMany(models.Game, {
      through: GameCard
    });

    Card.belongsToMany(models.User, {
      through: GameCard
    });
  };

  return Card;
};

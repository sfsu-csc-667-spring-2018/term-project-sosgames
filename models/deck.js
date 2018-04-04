'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deck = sequelize.define('Deck', {
    description: DataTypes.STRING,
    color: DataTypes.STRING,
    point_value: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {});
  Deck.associate = function(models) {
    // associations can be defined here
  };
  return Deck;
};
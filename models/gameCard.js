'use strict';
module.exports = (sequelize, DataTypes) => {
  let GameCard = sequelize.define('GameCard', {
    game_id: DataTypes.INTEGER,
    card_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    in_hand: DataTypes.BOOLEAN,
    in_deck: DataTypes.BOOLEAN,
    on_top: DataTypes.BOOLEAN
  }, {});

  GameCard.associate = function(models) {
  };

  return GameCard;
};
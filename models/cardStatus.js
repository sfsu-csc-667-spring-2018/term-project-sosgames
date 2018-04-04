'use strict';
module.exports = (sequelize, DataTypes) => {
  var CardStatus = sequelize.define('CardStatus', {
    user_id: DataTypes.INTEGER,
    game_session_id: DataTypes.INTEGER,
    card_id: DataTypes.INTEGER,
    in_hand: DataTypes.BOOLEAN,
    in_deck: DataTypes.BOOLEAN,
    in_discard: DataTypes.BOOLEAN
  }, {});
  CardStatus.associate = function(models) {
    // associations can be defined here
  };
  return CardStatus;
};
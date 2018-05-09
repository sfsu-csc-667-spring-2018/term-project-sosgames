'use strict';
module.exports = (sequelize, DataTypes) => {
  var session = sequelize.define(
    'session',
    {
      sid: DataTypes.STRING,
      sess: DataTypes.JSON,
      expire: DataTypes.DATE
    },
    {}
  );
  session.associate = function(models) {
    // associations can be defined here
  };
  return session;
};

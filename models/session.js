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
  session.associate = function(models) {};
  return session;
};

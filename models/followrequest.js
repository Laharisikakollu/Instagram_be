'use strict';
module.exports = (sequelize, DataTypes) => {
  const Followrequest = sequelize.define('Followrequest', {
    userId: DataTypes.INTEGER,
    followingId: DataTypes.INTEGER,
    accept: DataTypes.BOOLEAN
  }, {});
  Followrequest.associate = function(models) {
    // associations can be defined here
  };
  return Followrequest;
};
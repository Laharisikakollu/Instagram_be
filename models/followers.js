'use strict';
module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define('Followers', {
    userId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  }, {});
  Followers.associate = function(models) {
    // associations can be defined here
  };
  return Followers;
};
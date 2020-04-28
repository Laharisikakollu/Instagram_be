'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  Comments.associate = function(models) {
    // associations can be defined here
  };
  return Comments;
};
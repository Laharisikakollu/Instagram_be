'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post_Like = sequelize.define('Post_Like', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  Post_Like.associate = function(models) {
    Post_Like.belongsTo(models.Post1, { foreignKey: 'postId' });
    Post_Like.belongsTo(models.User, { foreignKey: 'userId' });
    models.Post1.hasMany(Post_Like,{foreignKey: 'postId'});
  };
  return Post_Like;
};
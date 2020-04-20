'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});

  Post.associate = function(models) {
    // Post.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Post;
};
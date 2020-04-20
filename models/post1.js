'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post1 = sequelize.define('Post1', {
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Post1.associate = function(models) {
   
    models.Images.belongsTo(Post1,{foreignKey: 'postId'});
    Post1.hasMany(models.Images,{foreignKey: 'postId'});
   
  };
  return Post1;
};
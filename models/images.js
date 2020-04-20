'use strict';
module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define('Images', {
    imageName: DataTypes.STRING,
    lastModified: DataTypes.DATE,
    postId: DataTypes.INTEGER,
    imageUrl: DataTypes.TEXT
  }, {});
  Images.associate = function(models) {
    // associations can be defined here
  };
  return Images;
};
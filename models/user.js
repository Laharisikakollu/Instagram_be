'use strict';
var bcrypt = require('bcrypt-nodejs');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    role: DataTypes.STRING,
    isaccept: DataTypes.BOOLEAN
  }, {});


  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  User.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  }; 

  User.associate = function(models) {
    User.hasMany(models.Post1, { foreignKey: 'userId' });
    User.hasMany(models.Post_Like, { foreignKey: 'userId' });
    // User.hasMany(models.FollowRequests, { foreignKey: 'userId' });
    // User.hasMany(models.Following, { foreignKey: 'userId' });
    // User.hasMany(models.Followers, { foreignKey: 'userId' });
  };
  return User;
};
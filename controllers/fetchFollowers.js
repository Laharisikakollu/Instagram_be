const models = require("../models");
const jwt = require("jsonwebtoken");

const fetchfollowers = async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: {
        userName: req.params.userName,
      },
    });

    let names = [];
    const followers = await models.Followers.findAll({
      where: {
        userId: user.id,
      },
    });

    obj = [...JSON.parse(JSON.stringify(followers, null, 4))];

    console.log(obj);
    for (var i = 0; i < obj.length; i++) {
      const name = await models.User.findOne({
        where: { id: obj[i].followerId },
      });

      names.push(name.userName);
    }

    const followings = [];
    const following = await models.Followers.findAll({
      where: {
        followerId: user.id,
      },
    });

    followin = [...JSON.parse(JSON.stringify(following, null, 4))];

    for (var i = 0; i < followin.length; i++) {
      const name = await models.User.findOne({
        where: { id: followin[i].userId },
      });

      followings.push(name.userName);
    }

    console.log(names.length);
    res.json({
      names,
      followings,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "ERROR",
      error,
    });
    next(error);
  }
};

module.exports = fetchfollowers;

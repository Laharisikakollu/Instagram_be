const models = require("../models");
const jwt = require("jsonwebtoken");

const fetchfollowing = async (req, res, next) => {
  try {
    console.log("hq");
    let names = [];
    let followings = [];
    const user = await models.User.findOne({
      where: {
        userName: req.params.userName,
      },
    });

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
      console.log(name);
      followings.push(name.userName);
    }

    res.json({
      following,
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

module.exports = fetchfollowing;

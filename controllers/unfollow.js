const models = require("../models");
const jwt = require("jsonwebtoken");

const unfollow = async (req, res, next) => {
  try {
    const payload = jwt.decode(req.body.token);

    const user = await models.User.findOne({
      where: {
        userName: req.body.requestName,
      },
    });

    console.log(payload);
    await models.Followers.destroy({
      where: {
        userId: user.id,
        followerId: payload.id,
      },
    });

    //followerId is the follower of userId

    res.status(200).json({
      message: "unfollowed",
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

module.exports = unfollow;

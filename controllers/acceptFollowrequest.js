const models = require("../models");
const jwt = require("jsonwebtoken");

const acceptfollowrequest = async (req, res, next) => {
  try {
    const payload = jwt.decode(req.body.token);

    const user = await models.User.findOne({
      where: {
        userName: req.body.acceptingName,
      },
    });

    if (req.body.accept == true) {
      const request = await models.Followrequest.findOne({
        where: { userId: user.id },
      });
      request.update({ accept: true });

      const follower = await models.Followers.create({
        userId: payload.id,
        followerId: user.id,
      });

      await models.Followrequest.destroy({
        where: { followingId: payload.id, userId: user.id },
      });
    } else {
      await models.Followrequest.destroy({
        where: { followingId: payload.id, userId: user.id },
      });
    }

    res.status(200).json({
      success: true,
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

module.exports = acceptfollowrequest;

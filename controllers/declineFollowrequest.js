const models = require("../models");
const jwt = require("jsonwebtoken");

const declinefollowrequest = async (req, res, next) => {
  try {
    const payload = jwt.decode(req.body.token);

    const user = await models.User.findOne({
      where: {
        userName: req.body.acceptingName,
      },
    });

    await models.Followrequest.destroy({
      where: {
        userId: user.id,
        followingId: payload.id,
      },
    });

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

module.exports = declinefollowrequest;

const models = require("../../models");
const logger=require('../../logger')
const jwt = require("jsonwebtoken");

/** @description Accepting Follow request of other users.
 * @param {object} req - Request object with userName.
 * @param {object} res - Reponse object with a boolean variable success.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 * @returns {Promise}
*/

const acceptfollowrequest = async (req, res, next) => {
  try {
    logger.info(req.url)
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
    logger.info(`${payload.userName} accepted follow request of ${user.userName}`)
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "ERROR",
      error,
    });
    logger.error(error.name)
    next(error);
  }
};

module.exports = acceptfollowrequest;

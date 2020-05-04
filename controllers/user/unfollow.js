const models = require("../../models");
const logger=require('../../logger')
const jwt = require("jsonwebtoken");

/** @description UnFollow other users.
 * @param {object} req - Request object with requestName.
 * @param {object} res - Reponse object with a message.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 * @returns {Promise}
*/

const unfollow = async (req, res, next) => {
  try {
    logger.info(req.url)
    const payload = jwt.decode(req.body.token);

    const user = await models.User.findOne({
      where: {
        userName: req.body.requestName,
      },
    });

   
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
    logger.error(error.name)
    next(error);
  }
};

module.exports = unfollow;

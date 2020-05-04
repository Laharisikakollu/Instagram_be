const models = require("../../models");
const logger=require('../../logger')
const jwt = require("jsonwebtoken");


/** @description Declining Follow request of other users.
 * @param {object} req - Request object with userName.
 * @param {object} res - Reponse object with a boolean variable success.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 * @returns {Promise}
*/

const declinefollowrequest = async (req, res, next) => {
  try {
    logger.info(req.url)
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
    logger.info(`${payload.userName} rejected follow request of ${user.userName}`)
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

module.exports = declinefollowrequest
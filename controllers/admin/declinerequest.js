const models = require("../../models");
const logger=require('../../logger')

/** @description Admin declining Signup request of other users.
 * @param {Object} req - Request object with userName.
 * @param {Object} res - Reponse object with a boolean variable success.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 * @returns {Promise}
*/


const declinerequest = async (req, res, next) => {
  try {
    logger.info(req.url)
    const users = await models.User.destroy({
      where: {
        userName: req.body.userName,
      },
    });
    res.status(200).json({
      users,
      success: true,
    });
    logger.info(`Admin rejected request of ${req.body.userName}`)
  } catch (error) {
    res.status(404).json({
      success: false,
    });
    logger.error(error.name)
    next(error);
  }
};

module.exports = declinerequest;

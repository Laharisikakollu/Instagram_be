const models = require("../../models");
const logger=require('../../logger')
const jwt = require("jsonwebtoken");

/** @description Allowing the users to login by checking the isaccept field.
 * @param {object} req - Request object with userName.
 * @param {object} res - Reponse object with a message.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 * @returns {Promise}
*/

const signuprequest = async (req, res, next) => {
  try {
     logger.info(req.url)
    const token = req.headers["access-token"];
    const payload = jwt.decode(token);

    const user = await models.User.findOne({
      where: {
        userName: req.body.userName,
      },
    });

    
    if (req.body.isaccept === 1) {
      user.update({ isaccept: true });

      res.json({
        message: "Updated",
      });
    } else if (req.body.isaccept === 0) {
     
      user.update({ isaccept: false });
      console.log(user);

      res.json({
        message: "Updated",
      });
    }
    logger.info(`Signup request of ${req.body.userName}`)
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

module.exports = signuprequest;

const models = require("../../models");
const logger=require('../../logger')

/** @description Signup.
 * @param {Object} req - Request object with userName,password,email,phonenumber and role.
 * @param {Object} res - Reponse object with a boolean variable success and user.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 * @returns {Promise}
*/


const signup = async (req, res, next) => {
  try {
    logger.info(req.url)
    const users = await models.User.findOne({
      where: {
        userName: req.body.userName,
      },
    });
   
    if (users) {
      res.status(201).json({
        message: "Username already exists",
      });
    } else {
      if (req.body.role === "admin") req.body = { ...req.body, isaccept: true };
      const user = await models.User.create(req.body);
      res.status(201).json({
        user,
        success: true,
      });
    }
    logger.info(` ${req.body.userName} Signedup`)
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "could not signup",
      error,
    });
    logger.error(error.name)
    next(error);
  }
};

module.exports = signup;

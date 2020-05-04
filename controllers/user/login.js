const models = require("../../models");
const jwt = require("jsonwebtoken");
const logger=require('../../logger')

/** @description Login.
 *  @param {object} req - Request object with userName and password.
 *  @param {object} res - Reponse object with a boolean variable success,uSuccess,pSuccess,token,user and role.
  * @param {requestCallback} next - The callback that calls the error handling middleware.
 *  @returns {Promise}
*/

const login = async (req, res, next) => {
  try {

    logger.info(req.url)
    const user = await models.User.findOne({
      where: {
        userName: req.body.userName,
      },
    });

   
    if (!user) {
      logger.info("logged in")
      return res.json({
        message: "Authentication failed. User not found.",
      });
      
    } else if (user.role === "admin") {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          var token = jwt.sign(
            { userName: req.body.userName, id: user.id },
            "nodeauthsecret"
          );
          res
            .status(200)
            .json({
              success: true,
              uSuccess: true,
              pSuccess: true,
              token: token,
              user: user,
              role: user.role,
            });
        } else {
          res
            .status(401)
            .send({
              success: false,
              msg: "Authentication failed. Wrong password.",
            });
        }
      });
    } else if (user.role === "user" && user.isaccept === true) {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          var token = jwt.sign(
            { userName: req.body.userName, id: user.id },
            "nodeauthsecret"
          );
          res
            .status(200)
            .json({
              success: true,
              uSuccess: true,
              pSuccess: true,
              role: user.role,
              token: token,
              user: user,
            });
        } else {
          res
            .status(401)
            .send({
              success: false,
              msg: "Authentication failed. Wrong password.",
            });
        }
        
      });
    } else if (user.role === "user" && user.isaccept === false) {
      return res.status(201).json({
        message: "Admin rejected your request",
      });
    } else if (user.role === "user" && user.isaccept === null) {
      return res.status(201).json({
        message: "Admin is still checking your request",
      });
    }
    logger.info(`${req.body.userName} logged in`)
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

module.exports = login;

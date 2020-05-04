const models = require("../../models");
const logger=require('../../logger')
const jwt = require("jsonwebtoken");

/** @description Get the list of users whom the loggedin user is following .
 * @param {object} req - Request object with userName.
 * @param {object} res - Reponse object with following otherwise a boolean variable called success and a message when false.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 * @returns {Promise}
*/

const fetchfollowing = async (req, res, next) => {
  try {
    logger.info(req.url)
    let names = [];
    let followings = [];
    const user = await models.User.findOne({
      where: {
        userName: req.params.userName,
      },
    });

    const following = await models.Followers.findAll({
      where: {
        followerId: user.id,
      },
    });

    followin = [...JSON.parse(JSON.stringify(following, null, 4))];

    for (var i = 0; i < followin.length; i++) {
      const name = await models.User.findOne({
        where: { id: followin[i].userId },
      });
      console.log(name);
      followings.push(name.userName);
    }

    res.json({
      following,
    });
    logger.info(` ${req.params.userName} is following ${following}`)
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

module.exports = fetchfollowing;

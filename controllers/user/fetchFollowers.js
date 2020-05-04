const models = require("../../models");
const logger=require('../../logger')
const jwt = require("jsonwebtoken");

/** @description Get  a particular user's followers.
 * @param {object} req - Request object with userName.
 * @param {object} res - Reponse object with names and following otherwise a boolean variable called success and a message when false.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 * @returns {Promise}
*/

const fetchfollowers = async (req, res, next) => {
  try {
    logger.info(req.url)
    const user = await models.User.findOne({
      where: {
        userName: req.params.userName,
      },
    });

    let names = [];
    const followers = await models.Followers.findAll({
      where: {
        userId: user.id,
      },
    });

    obj = [...JSON.parse(JSON.stringify(followers, null, 4))];

  
    for (var i = 0; i < obj.length; i++) {
      const name = await models.User.findOne({
        where: { id: obj[i].followerId },
      });

      names.push(name.userName);
    }

    const followings = [];
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

      followings.push(name.userName);
    }
    
    res.json({
      names,
      followings,
    });
    logger.info(`Followers of ${req.params.userName} are ${names}`)
    logger.info(` ${req.params.userName} is following ${followings}`)
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

module.exports = fetchfollowers;

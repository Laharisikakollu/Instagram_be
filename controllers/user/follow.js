const models = require("../../models");
const logger=require('../../logger')
const jwt = require("jsonwebtoken");

/** @description Follow other users.
 * @param {object} req - Request object with requestName.
 * @param {object} res - Reponse object with follow or a success variable and message when false.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 * @returns {Promise}
*/

const follow = async (req, res, next) => {
  try {
   
    logger.info(req.url)
    const payload = jwt.decode(req.body.token);
   
    const user = await models.User.findOne({
      where: {
        userName: req.body.requestName,
      },
    });
    console.log(payload.id, user.id);
    const l = await models.Followrequest.findAll({
      where: {
        userId: payload.id,
        followingId: user.id, //userId requests to follow followingId
      },
    });

    obj = [...JSON.parse(JSON.stringify(l, null, 4))];

    const a = await models.Followers.findAll({
      where: {
        userId: user.id,
        followerId: payload.id,
      },
    });

    obj1 = [...JSON.parse(JSON.stringify(a, null, 4))];
    const follow = {};

    if (obj.length === 0 && obj1.length === 0) {
      follow = await models.Followrequest.create({
        userId: payload.id,
        followingId: user.id,
      });
    } else if (obj1.length !== 0) {
      await models.Followers.destroy({
        where: {
          userId: user.id,
          followerId: payload.id,
        },
      });
    }

    res.status(200).json({
      follow,
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

module.exports = follow;

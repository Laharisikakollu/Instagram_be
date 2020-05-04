const models = require("../../models");
const logger=require('../../logger')

/** @description Get Follow request.
 * @param {object} req - Request object with userName .
 * @param {object} res - Reponse object with a boolean variable success and followrequest when true and boolean variable along with message when false.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 * @returns {Promise}
*/

const getfollowrequest = async (req, res, next) => {
  try {
    logger.info(req.url)
    const users = await models.User.findAll({
      where: {
        userName: req.params.userName,
      },
    });
    obj = [...JSON.parse(JSON.stringify(users, null, 4))];

    const followRequests = await models.Followrequest.findAll({
      where: {
        followingId: obj[0].id,
      },
    });

    obj1 = [...JSON.parse(JSON.stringify(followRequests, null, 4))];
    let followrequest = [];

    for (var i = 0; i < obj1.length; i++) {
      const name = await models.User.findOne({
        where: { id: obj1[i].userId },
      });

      followrequest.push(name.userName);
    }

    console.log(followrequest, req.params.userName);

    res.status(200).json({
      success: true,
      followrequest,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "could not find follow requests",
      error,
    });
    logger.error(error.name)
    next(error);
  }
};

module.exports = getfollowrequest;

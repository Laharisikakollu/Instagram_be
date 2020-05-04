const models = require("../../models");
const jwt = require("jsonwebtoken");
const logger=require('../../logger')
const moment = require("moment");

/** @description Getting comments of a particular post.
 * @param {object} req - Request object with postId.
 * @param {object} res - Reponse object with a boolean variable success and names.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 * @returns {Promise}
*/

const getComment = async (req, res, next) => {
  try {
    logger.info(req.url)
    const comments = await models.Comments.findAll({
      where: {
        postId: req.params.postId,
      },
    });

    comment = [...JSON.parse(JSON.stringify(comments, null, 4))];

    let names = [];
    for (var i = 0; i < comment.length; i++) {
      const username = await models.User.findOne({
        where: {
          id: comment[i].userId,
        },
      });
      names.push({ name: username.userName, comment: comment[i].comment });
    }

    res.status(200).json({
      names,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error,
    });
    logger.error(error.name)
  }
};
module.exports = getComment;

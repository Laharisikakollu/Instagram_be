const models = require("../../models");
const jwt = require("jsonwebtoken");
const logger=require('../../logger')
const moment = require("moment");

/** @description User adds comment to the post.
 * @param {object} req - Request object with postId and comment.
 * @param {object} res - Reponse object with a message success.
*/

const addComment = async (req, res, next) => {
  try {
    logger.info(req.url)
    const payload = jwt.decode(req.body.token);

    const comment = await models.Comments.create({
      userId: payload.id,
      postId: req.body.postId,
      comment: req.body.comment,
    });

    res.status(200).json({
      message: "success",
    });
    logger.info(`${payload.userName} added a comment to post  ${req.body.postId}`)
  } catch (error) {
    res.status(400).json({
      status: false,
      error,
    });
    logger.error(error.name)
  }
};

module.exports = addComment;

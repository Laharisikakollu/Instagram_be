const models = require("../../models");
const jwt = require("jsonwebtoken");
const logger=require('../../logger')

/** @description Add and delete like for a post.
 * @param {object} req - Request object with userId and postId.
 * @param {object} res - Reponse object with a message.
  * @param {requestCallback} next - The callback that calls the error handling middleware.
 * @returns {Promise}
*/

const addLike = async (req, res, next) => {
  try {
    logger.info(req.url)
    const like = await models.Post_Like.findOne({
      where: {
        userId: req.body.userId,
        postId: req.body.postId,
      },
    });
    
    if (!like) {
      const post2 = await models.Post_Like.create({
        postId: req.body.postId,
        userId: req.body.userId,
      });
      logger.info(`${req.body.postId} of ${req.body.userId} user is liked`)
    } else {
      const dislike = await models.Post_Like.destroy({
        where: {
          userId: req.body.userId,
          postId: req.body.postId,
        },
      });
      logger.info(`${req.body.postId} post of ${req.body.userId} user is disliked`)
    }

    res.status(200).json({
      message: "success",
    });
    
  } catch (error) {
    res.status(400).json({
      status: false,
      error,
    });
    logger.error(error.name)
  }
};
module.exports = addLike;

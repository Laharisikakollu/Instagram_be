const models = require("../../models");
const logger=require('../../logger')
const jwt = require("jsonwebtoken");

/** @description Deleting post.
 * @param {object} req - Request object with postId.
 * @param {object} res - Reponse object with a boolean variable success and a message.
*/

const deletePost = async (req, res, next) => {
  try {
    logger.info(req.url)

    await models.Post_Like.destroy({
      where: {
        postId: req.body.postId,
      },
    });

    let images = await models.Images.destroy({
      where: {
        postId: req.body.postId,
      },
    });

    await models.Post1.destroy({
      where: {
        id: req.body.postId,
      },
    });

    res.json({
      message: "deleted",
      success: true,
    });
    logger.info("Post deleted")
  } catch (error) {
    res.status(400).json({
      status: false,
      error,
    });
    logger.error(error.name)
  }
};
module.exports = deletePost;

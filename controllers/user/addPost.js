const models = require("../../models");
const jwt = require("jsonwebtoken");
const logger=require('../../logger')
const moment = require("moment");

/** @description Adding Post.
 * @param {object} req - Request object with description.
 * @param {object} res - Reponse object with a boolean variable success and image.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 * @returns {Promise}
*/

const addPost = async (req, res, next) => {
  try {
    logger.info(req.url)
    const payload = jwt.decode(req.body.token);

    const newPost = await models.Post1.create({
      description: req.body.description,
      userId: payload.id,
    });

    const image = {};
    req.body.imageList.map(async (el, key) => {
      image = await models.Images.create({
        imageName: el.name,
        postId: newPost.id,
        imageUrl: el.thumbUrl,
        lastModified: moment(el.lastModified),
      });
    });
    
    res.status(200).json({
      success: true,
      image,
    });
    logger.info(`${payload.userName} added a post`)
  } catch (error) {
    res.status(404).json({
      success: false,
    });
    logger.error(error.name)
    next(error);
  }
};

module.exports = addPost;

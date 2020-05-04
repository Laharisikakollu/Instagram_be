const models = require("../../models");
const logger=require('../../logger')
const jwt = require("jsonwebtoken");
const moment = require("moment");

/** @description Get posts of a user.
 * @param {object} req - Request object with userName.
 * @param {object} res - Reponse object with a boolean variable success and posts1.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 * @returns {Promise}
*/

const getPosts = async (req, res, next) => {
  try {

    logger.info(req.url)
    const user = await models.User.findOne({
      where: {
        userName: req.params.id,
      },
    });
  
    const posts = await models.Post1.findAll({
      where: {
        userId: user.id,
      },
    });

   

    let names = [];
    let posts1 = [];
    obj = [...JSON.parse(JSON.stringify(posts, null, 4))];

    for (var i = 0; i < obj.length; i++) {
      const name = await models.Images.findAll({
        where: {
          postId: obj[i].id,
        },
      });

      imj = [...JSON.parse(JSON.stringify(name, null, 4))];
      console.log(imj[0].imageName);
      const likes = await models.Post_Like.findAll({
        where: {
          postId: obj[i].id,
        },
      });

      for (j = 0; j < imj.length; j++) {
        names.push(imj[j].imageUrl);
      }

      imj = [];

      posts1.push({
        images: names,
        description: obj[i].description,
        likes: likes.length,
        id: obj[i].id,
      });

      names = [];
    }

    res.status(200).json({
      posts1,
      success: true,
    });
    logger.info(`Posts of ${req.params.id}`)
  } catch (error) {
    res.status(400).json({
      status: false,
      error,
    });
    logger.error(error.name)
  }
};
module.exports = getPosts;

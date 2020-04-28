const models = require("../models");
const jwt = require("jsonwebtoken");

const deletePost = async (req, res, next) => {
  try {
    console.log("delete", req.body);

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
  } catch (error) {
    res.status(400).json({
      status: false,
      error,
    });
  }
};
module.exports = deletePost;

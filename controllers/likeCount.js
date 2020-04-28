const models = require("../models");
const jwt = require("jsonwebtoken");

const LikeCount = async (req, res, next) => {
  try {
    const token = req.headers["access-token"];
    const payload = jwt.decode(token);

    const likes = await models.Post_Like.findAll({
      where: {
        postId: req.params.postId,
      },
    });

    const count = likes.length;
    res.status(200).json({
      count,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error,
    });
  }
};
module.exports = LikeCount;

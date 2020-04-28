const models = require("../models");
const jwt = require("jsonwebtoken");

const deleteLike = async (req, res, next) => {
  try {
    const token = req.headers["access-token"];
    const payload = jwt.decode(token);

    await models.Post_Like.destroy({
      where: {
        userId: payload.userId,
        postId: req.body.postId,
      },
    });
    res.json({
      message: "deleted like",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error,
    });
  }
};
module.exports = deleteLike;

const models = require("../models");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const addComment = async (req, res, next) => {
  try {
    const payload = jwt.decode(req.body.token);

    const comment = await models.Comments.create({
      userId: payload.id,
      postId: req.body.postId,
      comment: req.body.comment,
    });

    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error,
    });
  }
};

module.exports = addComment;

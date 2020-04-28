const models = require("../models");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const getComment = async (req, res, next) => {
  try {
    console.log("get comments");
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
  }
};
module.exports = getComment;

const models = require("../models");
const jwt = require("jsonwebtoken");

const addLike = async (req, res, next) => {
  try {
    const token = req.headers["access-token"];
    const payload = jwt.decode(token);

    const following = await models.Following.create(req.body);
    res.status(200).json({
      following,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error,
    });
  }
};
module.exports = addLike;

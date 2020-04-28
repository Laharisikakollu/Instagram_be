const models = require("../models");

const declinerequest = async (req, res, next) => {
  try {
    const users = await models.User.destroy({
      where: {
        userName: req.body.userName,
      },
    });
    res.status(200).json({
      users,
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
    });
    next(error);
  }
};

module.exports = declinerequest;

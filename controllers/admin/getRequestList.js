const models = require("../../models");
const logger=require('../../logger')

/** @description Get list of signup requests of admin.
 * @param {object} res - Reponse object with names when true and a boolean variable succes and a message when false.
 * @param {requestCallback} next - The callback that calls the error handling middleware.
 * @returns {Promise}
*/


const getrequestlist = async (req, res, next) => {
  try {
    logger.info(req.url)
    let names = [];
   
    const users = await models.User.findAll({
      attributes: ["userName"],
      where: {
        isaccept: null,
      },
    });

    obj = [...JSON.parse(JSON.stringify(users, null, 4))];
    obj.map((item) => {
      names.push(item.userName);
    });

    res.json({
      names,
    });
    logger.info(`Request list ${names}`)
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "could not find requests",
      error,
    });
    logger.error(error.name)
    next(error);
  }
};

module.exports = getrequestlist;

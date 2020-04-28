require("dotenv").config();
const nodemailer = require("nodemailer");
const models = require("../models");

const jwt = require("jsonwebtoken");
const acceptrequest = async (req, res, next) => {
  try {
    const payload = jwt.decode(req.body.token);

    let subject = "An email using nodejs app";
    let text = "Admin accepted your request";

    if (req.body.isaccept === true) {
      const users = await models.User.update(
        { isaccept: req.body.isaccept },
        {
          where: {
            userName: req.body.userName,
          },
        }
      );

      const user = await models.User.findOne({
        where: {
          userName: req.body.userName,
        },
      });

      const admin = await models.User.findOne({
        where: {
          id: payload.id,
        },
      });

      //   let fromMail = admin.email;
      let toMail = user.email;
      const heylo = process.env.NODEMAILER_ADDRESS;
      const heylopass = process.env.NODEMAILER_PASSWORD;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_ADDRESS,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });

      let mailOptions = {
        from: process.env.NODEMAILER_ADDRESS,
        to: toMail,
        subject: subject,
        text: text,
      };

      await transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
          console.log(error);
        }
        console.log(response);
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "accepted",
    });
    next(error);
  }
};

module.exports = acceptrequest;

// Backend/app/controllers/authController.js

import jwt from "jsonwebtoken";

import { User } from "../models/model.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ user_email: email });
    console.log(user);

    if (!user) {
      return res.status(402).json({ message: "User not registered" });
    }
    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aibetic2projectteam@gmail.com",
        pass: "qlmx cyzi aijy msjk",
      },
    });

    // var mailOptions = {
    //   from: "aibetic2projectteam@gmail.com",
    //   to: email,
    //   subject: "Reset Password",
    //   text: `http://localhost:5173/reset-password/${token}`,
    // };

    var mailOptions = {
      from: "aibetic2projectteam@gmail.com",
      to: email,
      subject: "Reset Your Password - AIBetic2 Team",
      html: `
        <h1>Welcome to AIBetic2!</h1>
        <p>Hello,</p>
        <p>You're receiving this email because we received a password reset request for your account.</p>
        <p>Please click on the link below to reset your password. This link is valid for 30 minutes:</p>
        <a href="http://localhost:5173/reset-password/${token}">Reset Password</a>
        <p>If you did not request a password reset, no further action is required on your part.</p>
        <p>Thank you for being part of our community!</p>
        <p>Warm regards,</p>
        <p>The AIBetic2 Team</p>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res
          .status(404)
          .json({ message: "An error occurred while sending email." });
      } else {
        return res.status(200).json({ message: "Email sent." });
      }
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred during reseting password" });
  }
};

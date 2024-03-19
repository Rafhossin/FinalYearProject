// Backend/app/controllers/authController.js

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/model.js";
import dotenv from "dotenv";

dotenv.config();
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ user_email: email });
    console.log(user);

    if (!user) {
      return res.status(402).json({ message: "Email does not exist" });
    }
    console.log(password);
    const isValid = await bcrypt.compare(password, user.password_hash);
    console.log(isValid);

    if (!isValid) {
      return res.status(403).json({ message: "Password is not correct" });
    }

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    });
    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during sign in" });
  }
};

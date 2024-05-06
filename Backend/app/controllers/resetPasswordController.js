import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/model.js";
import dotenv from "dotenv";

dotenv.config();

export const resetPasswordController = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authorization header is required" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  // const { token } = req.params;
  const { password } = req.body;

  if (!password || password.trim() === "") {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.user_id) {
      return res
        .status(400)
        .json({ message: "Invalid token: User ID not found" });
    }

    const user = await User.findById(decoded.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Directly hash the password and store in password_hash
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password_hash = hashedPassword; // Update the password_hash field

    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({
      message: "An error occurred during resetting password",
      error: error.message,
    });
  }
};

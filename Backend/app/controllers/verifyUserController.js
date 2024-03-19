import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/model.js";
import dotenv from "dotenv";

dotenv.config();

export const verifyUserController = async (req, res, next) => {
  try {
    const { token } = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.error("Error verifying user: ", error);
    return res.status(400).json({ message: "Error verifying user" });
  }
};

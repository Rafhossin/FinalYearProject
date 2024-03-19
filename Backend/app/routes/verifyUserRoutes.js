import express from "express";
import verifyUserMiddleware from "../middleware/verifyUserMiddleware.js";
import { User } from "../models/model.js";

const router = express.Router();

router.get("/verifyUser", verifyUserMiddleware, async (req, res) => {
  try {
    const userId = req.user.user_id; // Extracted from decoded JWT
    console.log("userId", userId);

    // Fetch user data from database
    const userData = await User.findById(userId);
    console.log("userData", userData);
    // If user data is found, return a success message
    if (userId) {
      return res
        .status(200)
        .json({ message: "Access granted to protected route", userId });
    } else {
      return res
        .status(401)
        .json({ message: "Access denied. Invalid user ID." });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

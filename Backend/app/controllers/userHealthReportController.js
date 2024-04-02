// userHealthReportController.js

import { User } from "../models/model.js";

const userHealthReportController = async (req, res) => {
  const userId = req.user.user_id; // Extracted from decoded JWT

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User does not exist, please input the correct user Id.",
      });
    }
    console.log(user);
    res.status(200).json({
      message: "User fetched successfully.",
      user: user, // Return the user data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Server Error" });
  }
};

export default userHealthReportController;

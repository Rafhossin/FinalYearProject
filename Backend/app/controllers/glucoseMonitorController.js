import { User } from "../models/model.js";

const glucoseMonitorController = async (req, res) => {
  const { date, time, reading } = req.body;
  const userId = req.user.user_id; // Extracted from decoded JWT

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User does not exist, please input the correct user Id.",
      });
    }

    const date_time = new Date(`${date}T${time}`);
    const glucose_level = Number(reading);

    user.health_profile.glucose_readings.push({ date_time, glucose_level });

    await user.save();

    console.log(user.health_profile.glucose_readings);
    console.log(user);
    res.status(200).json({
      message: "Your glucose value have been updated successfully.",
      user: user, // Return the updated user data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Server Error" });
  }
};

export default glucoseMonitorController;

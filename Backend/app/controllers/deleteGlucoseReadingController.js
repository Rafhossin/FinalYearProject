import { User } from "../models/model.js";

const deleteGlucoseReadingController = async (req, res) => {
  const { date, time, glucose_level } = req.body;
  const userId = req.user.user_id; // Extracted from decoded JWT
  console.log(req.body);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User does not exist, please input the correct user Id.",
      });
    }

    const date_time = new Date(`${date}T${time}`);

    // Find the index of the glucose reading to delete
    const index = user.health_profile.glucose_readings.findIndex(
      (reading) =>
        reading.date_time.getTime() === date_time.getTime() &&
        reading.glucose_level === glucose_level
    );

    if (index === -1) {
      return res.status(404).json({
        status: 404,
        message: "Glucose reading not found.",
      });
    }
    console.log(user.health_profile);
    // Remove the glucose reading
    user.health_profile.glucose_readings.splice(index, 1);

    await user.save();

    res.status(200).json({
      message: "Glucose reading deleted successfully.",
      user: user, // Return the updated user data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Server Error" });
    setErrorMessage("Server Error");
  }
};

export default deleteGlucoseReadingController;

import { User } from "../models/model.js";

const deleteGlucoseReadingController = async (req, res) => {
  const { date, time, glucose_level } = req.body;
  const userId = req.user.user_id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User does not exist, please input the correct user Id.",
      });
    }

    // Convert the incoming glucose_level to a number if it's not already
    const glucoseLevelNumber = Number(glucose_level);

    // Construct the date_time object with the correct time zone
    const date_time = new Date(`${date}T${time}.000+00:00`);

    // Find the index of the glucose reading to delete
    const index = user.health_profile.glucose_readings.findIndex((reading) => {
      // Compare dates as ISO strings, ensure that both have the same format
      const readingDateTime = new Date(reading.date_time).toISOString();
      const inputDateTime = date_time.toISOString();
      return (
        readingDateTime === inputDateTime &&
        reading.glucose_level === glucoseLevelNumber
      );
    });

    if (index === -1) {
      return res.status(404).json({
        message: "Glucose reading not found.",
      });
    }

    // Remove the glucose reading
    user.health_profile.glucose_readings.splice(index, 1);

    await user.save();

    res.json({
      message: "Glucose reading deleted successfully.",
      user: user, // Return the updated user data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default deleteGlucoseReadingController;

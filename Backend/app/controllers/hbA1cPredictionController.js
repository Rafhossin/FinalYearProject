import { User } from "../models/model.js"; // Ensure the path is correct
import axios from "axios";

// Function to determine the risk factor based on the HbA1c value
const determineRiskFactor = (hba1cValue) => {
  if (hba1cValue < 5.7) {
    return "Low";
  } else if (hba1cValue >= 5.7 && hba1cValue < 6.5) {
    return "Medium";
  } else {
    return "High";
  }
};

export const hbA1cPredictionController = async (req, res) => {
  const userId = req.user.user_id; // Extracted from decoded JWT

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message:
          "User not found. Please ensure the correct user ID is provided.",
      });
    }

    // Extract the last 20 glucose readings from the user's health profile
    const glucoseReadings = user.health_profile.glucose_readings
      .slice(-20)
      .map((reading) => reading.glucose_level);

    console.log("Glucose Readings: ", glucoseReadings);

    // Proceed with sending readings to the Flask API for prediction
    const response = await axios.post(
      "https://aibetic2-75e99e1607a5.herokuapp.com/predict-hba1c",
      {
        readings: glucoseReadings,
      }
    );

    // Determine the risk factor based on the predicted HbA1c value
    const riskFactor = determineRiskFactor(response.data.predicted_hba1c);

    console.log("Predicted HbA1c:---------- ", response.data.predicted_hba1c);

    // Save the prediction result in the user model
    user.health_profile.HbA1c_readings.push({
      date_time: new Date(),
      HbA1c_value: response.data.predicted_hba1c,
    });

    // Save the assessment result in the user model
    user.health_profile.HbA1c_assessment_result.push({
      assessment_date: new Date(),
      risk_score: `HbA1c risk score is ${riskFactor}`,
    });

    await user.save();

    // Send the prediction result and the readings back to the front end
    res.status(200).json({
      message: "HbA1c prediction has been made successfully.",
      predicted_hba1c: response.data.predicted_hba1c,
      readings: glucoseReadings, // Include the actual readings used for the prediction
      risk_score: ` ${riskFactor}`,
      user: user, // Return the updated user data
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: 500, message: "Server Error", error: error.message });
  }
};

export default hbA1cPredictionController;

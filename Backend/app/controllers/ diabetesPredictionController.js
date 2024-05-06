import { User } from "../models/model.js";
import axios from "axios";

export const diabetesPredictionController = async (req, res) => {
  // Extract the form data from the request body
  const {
    age,
    gender,
    suddenWeightLoss: sudden_weight_loss,
    polyphagia,
    polyuria,
    polydipsia,
    partialParesis: partial_paresis,
    visualBlurring: visual_blurring,
    irritability,
    weakness,
    delayedHealing: delayed_healing,
    alopecia,
    itching,
  } = req.body;

  console.log("dataaaaa", req.body);

  const userId = req.user.user_id; // Extracted from decoded JWT

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User does not exist, please input the correct user Id.",
      });
    }

    // Save the form data in the user model
    user.health_profile.risk_factors = {
      age,
      gender,
      sudden_weight_loss,
      polyphagia,
      polyuria,
      polydipsia,
      partial_paresis,
      visual_blurring,
      irritability,
      weakness,
      delayed_healing,
      alopecia,
      itching,
    };

    await user.save();

    // Reformat form data
    const formattedData = {
      age,
      gender,
      "sudden weight loss": sudden_weight_loss,
      polyphagia,
      polyuria,
      polydipsia,
      "partial paresis": partial_paresis,
      "visual blurring": visual_blurring,
      irritability,
      weakness,
      "delayed healing": delayed_healing,
      alopecia,
      itching,
    };

    // Send the form data to the Flask model
    const response = await axios.post(
      "https://aibetic2-75e99e1607a5.herokuapp.com/predict",
      formattedData
    );

    // Save the prediction result in the user model
    user.health_profile.assessment_result.push({
      assessment_date: Date.now(),
      diabetes_prediction_result:
        response.data.prediction === 1
          ? "likely to be diabetic"
          : "unlikely to be diabetic",
    });

    await user.save();

    // Send the prediction result back to the front end
    res.status(200).json({
      message: "The diabetes prediction has been made successfully.",
      prediction: response.data.prediction === 1 ? "positive" : "negative",
      user: user, // Return the updated user data
    });
  } catch (error) {
    console.error(error);
    if (error.response) {
      // The request was made and the server responded with a status code

      console.log("Error");
    } else if (error.request) {
      // The request was made but no response was received
      console.log("Error");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error");
    }
    res.status(500).json({ status: 500, message: "Server Error" });
  }
};

export default diabetesPredictionController;

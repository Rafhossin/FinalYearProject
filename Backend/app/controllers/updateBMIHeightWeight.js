import { User } from "../models/model.js";

const updateBMIHeightWeight = async (req, res) => {
  const { bmi, height, weight } = req.body;
  const userId = req.user.user_id; // Extracted from decoded JWT

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User does not exist, please input the correct user Id.",
      });
    }

    if (bmi) user.health_profile.bmi = bmi;
    if (height) user.health_profile.height = height;
    if (weight) user.health_profile.weight = weight;
    await user.save();
    console.log(user);
    res.status(200).json({
      message: "Your BMI, height and weight have been updated successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Server Error" });
  }
};

export default updateBMIHeightWeight;

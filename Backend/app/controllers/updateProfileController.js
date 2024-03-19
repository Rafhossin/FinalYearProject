import { User } from "../models/model.js"; // Assuming you have a User model
import bcrypt from "bcrypt";

const updateProfile = async (req, res) => {
  const { email, password } = req.body;
  const userId = req.user.user_id; // Extracted from decoded JWT
  console.log("userId", userId);

  try {
    const user = await User.findById(userId);
    console.log("raf", user);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User does not exist, please input the correct user Id.",
      });
    }

    if (email) user.user_email = email;
    if (password) {
      // Directly hash the password and store in password_hash
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password_hash = hashedPassword; // Update this field directly
      // Optionally set 'password' to undefined if your schema/middleware requires it
      // user.password = undefined;
      await user.save();
    }
    await user.save();

    res
      .status(200)
      .json({ message: "Your Profile has been updated successfully." });
    console.log(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Server Error" });
  }
};

export default updateProfile;

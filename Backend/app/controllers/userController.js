import { User } from "../models/model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { email, password, firstName, surname, gender, dob, employeeId } =
      req.body;
    const existingUser = await User.findOne({
      $or: [{ user_email: email }, { user_employee_id: employeeId }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      user_email: email,
      password_hash: hashedPassword,
      user_first_name: firstName,
      user_last_name: surname,
      gender,
      date_of_birth: dob,
      user_employee_id: employeeId,
    });

    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

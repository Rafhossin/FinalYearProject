import Employee from "../models/employees.js";

export const checkEmployeeId = async (req, res) => {
  const { employeeId } = req.body;

  try {
    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json({
        status: 404,
        message:
          "Employee does not exist, please input the correct employee Id.",
      });
    }

    res.status(200).json({ message: "Employee exists." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

import mongoose from "mongoose";

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
});

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;

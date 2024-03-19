import mongoose from "mongoose";
import Employee from "../models/employees.js";

mongoose
  .connect(
    "mongodb+srv://w1785478:Khossin07654@cluster0.ytlbo2y.mongodb.net/AIBetic2",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));
const getRandomSixDigitNumber = () =>
  Math.floor(100000 + Math.random() * 900000); // This will generate a random six-digit number

const populateEmployees = async () => {
  for (let i = 1; i <= 20; i++) {
    const Employees = new Employee({
      employeeId: getRandomSixDigitNumber().toString(), // This will generate a random six-digit employee ID
      // Add other fields as necessary
    });

    try {
      await Employees.save();
    } catch (err) {
      console.log(err);
      i--; // If there was an error (likely a duplicate ID), decrement the counter to try again
    }
  }

  console.log("Employees populated");
};

populateEmployees();

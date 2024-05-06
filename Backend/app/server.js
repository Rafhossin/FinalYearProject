import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./config/database.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // import user routes
import authRoutes from "./routes/authRoutes.js"; // import auth routes
import updateProfileRoutes from "./routes/updateProfileRoutes.js"; // import update profile routes
import updateBMIHeightWeightRoutes from "./routes/updateBMIHeightWeightRoutes.js"; // import update profile routes

import diabetesPredictionRoutes from "./routes/diabetesPredictionRoutes.js"; // import diabetes prediction routes

import hba1cPredictionRoutes from "./routes/hbA1cPredictionRoutes.js"; // import hba1c prediction routes

import glucoseMonitorRoutes from "./routes/glucoseMonitorRoutes.js"; // import glucose monitor routes

import deleteGlucoseReadingRoutes from "./routes/deleteGlucoseReadingRoutes.js"; // import delete glucose reading routes
import userHealthReportRoutes from "./routes/userHealthReportRoutes.js"; // import user health report routes

import forgotPassRoutes from "./routes/forgotPasswordRoutes.js"; // import reset password routes
import resetPasswordRoutes from "./routes/resetPasswordRoutes.js"; // import reset password routes
import verifyUserRoutes from "./routes/verifyUserRoutes.js"; // import verify user routes
import logoutRoutes from "./routes/logoutRoutes.js"; // import logout routes
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.set("trust proxy", 1); // trust first proxy
//middleware function
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//define routes
app.use("/api/employees", employeeRoutes); // use employee routes
app.use("/api/users", userRoutes); // use user routes
app.use("/api/auth", authRoutes); // use auth routes
app.use("/api/profile", updateProfileRoutes); // use update profile routes
app.use("/api", updateBMIHeightWeightRoutes); // use update BMI, height, weight routes
app.use("/api", glucoseMonitorRoutes); // use glucose monitor routes
app.use("/api", diabetesPredictionRoutes); // use diabetes prediction routes
app.use("/api", hba1cPredictionRoutes); // use hba1c prediction routes
app.use("/api", userHealthReportRoutes); // use user health report routes
app.use("/api", deleteGlucoseReadingRoutes); // use delete glucose reading routes
app.use("/api", forgotPassRoutes); // use forgot password routes
app.use("/api", resetPasswordRoutes); // use reset password routes
app.use("/api", verifyUserRoutes); // use verify user routes
app.use("/api", logoutRoutes); // use logout routes

const port = process.env.PORT || 3000;
//const port = 80;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

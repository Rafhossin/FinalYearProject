import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./config/database.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // import user routes
import authRoutes from "./routes/authRoutes.js"; // import auth routes
import updateProfileRoutes from "./routes/updateProfileRoutes.js"; // import update profile routes
import forgotPassRoutes from "./routes/forgotPasswordRoutes.js"; // import reset password routes
import resetPasswordRoutes from "./routes/resetPasswordRoutes.js"; // import reset password routes
import verifyUserRoutes from "./routes/verifyUserRoutes.js"; // import verify user routes
import logoutRoutes from "./routes/logoutRoutes.js"; // import logout routes
import dotenv from "dotenv";

dotenv.config();

const app = express();
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
app.use("/api/employees", employeeRoutes);
app.use("/api/users", userRoutes); // use user routes
app.use("/api/auth", authRoutes); // use auth routes
app.use("/api/profile", updateProfileRoutes);
app.use("/api", forgotPassRoutes);
app.use("/api", resetPasswordRoutes);
app.use("/api", verifyUserRoutes);
app.use("/api", logoutRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

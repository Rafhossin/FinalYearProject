import express from "express";
import { forgotPasswordController } from "../controllers/forgotPasswordController.js";

const router = express.Router();

router.post("/forget-password", forgotPasswordController);

export default router;

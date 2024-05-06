import express from "express";
import { resetPasswordController } from "../controllers/resetPasswordController.js";

const router = express.Router();

// Reset password route
router.put("/reset-password", resetPasswordController);

export default router;

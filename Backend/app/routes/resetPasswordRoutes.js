import express from "express";
import { resetPasswordController } from "../controllers/resetPasswordController.js";

const router = express.Router();

// router.put("/reset-password/:token", resetPasswordController);
router.put("/reset-password", resetPasswordController);

export default router;

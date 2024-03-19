import express from "express";
import { resetPasswordController } from "../controllers/resetPasswordController.js";

const router = express.Router();

router.put("/reset-password/:token", resetPasswordController);

export default router;

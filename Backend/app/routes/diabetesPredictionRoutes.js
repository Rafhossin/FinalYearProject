import express from "express";
import verifyUserMiddleware from "../middleware/verifyUserMiddleware.js";
import diabetesPredictionController from "../controllers/ diabetesPredictionController.js";
const router = express.Router();

router.post(
  "/diabetes-prediction",
  verifyUserMiddleware,
  diabetesPredictionController
);

export default router;

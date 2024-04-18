import express from "express";
import verifyUserMiddleware from "../middleware/verifyUserMiddleware.js";
import hbA1cPredictionController from "../controllers/hbA1cPredictionController.js";
const router = express.Router();

router.post(
  "/hba1c-prediction",
  verifyUserMiddleware,
  hbA1cPredictionController
);

export default router;

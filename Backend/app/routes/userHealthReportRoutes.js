// userHealthReportRoutes.js

import express from "express";
import userHealthReportController from "../controllers/userHealthReportController.js";
import verifyUserMiddleware from "../middleware/verifyUserMiddleware.js";

const router = express.Router();

router.get("/health-report", verifyUserMiddleware, userHealthReportController);

export default router;

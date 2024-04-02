import express from "express";
import verifyUserMiddleware from "../middleware/verifyUserMiddleware.js";
import glucoseMonitorController from "../controllers/glucoseMonitorController.js";

const router = express.Router();

router.post("/glucose", verifyUserMiddleware, glucoseMonitorController);

export default router;

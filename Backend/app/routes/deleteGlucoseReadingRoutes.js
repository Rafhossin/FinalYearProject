import express from "express";
import verifyUserMiddleware from "../middleware/verifyUserMiddleware.js";
import deleteGlucoseReadingController from "../controllers/deleteGlucoseReadingController.js";

const router = express.Router();

router.delete(
  "/deleteTableRow",
  verifyUserMiddleware,
  deleteGlucoseReadingController
);

export default router;
